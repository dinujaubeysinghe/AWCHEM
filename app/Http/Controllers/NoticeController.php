<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Notice;
use App\Models\StudentClasses;
use App\Models\StudentEnrollment;
use App\Http\Resources\NoticeResource;

class NoticeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    return NoticeResource::collection(
        Notice::whereNull('student_class_id')->orderBy('id', 'desc')->paginate(10)
    );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $notice = Notice::create($data);
        return response(new NoticeResource($notice), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
{
    $notice = Notice::findOrFail($id);

    if ($notice->student_class_id) {
        $this->authorizeClassAccess($request, (string) $notice->student_class_id);
    }

    return new NoticeResource($notice);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $notice = Notice::findOrFail($id);
        $notice->update($data);
        return new NoticeResource($notice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $notice = Notice::findOrFail($id);
        $notice->delete();
        return response()->noContent();
    }

    public function classIndex(Request $request, string $classId)
    {
        $this->authorizeClassAccess($request, $classId);

        return NoticeResource::collection(
            Notice::where('student_class_id', $classId)->latest()->get()
        );
    }

    public function classStore(Request $request, string $classId)
    {
        StudentClasses::findOrFail($classId);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        $data['student_class_id'] = $classId;

        return response(new NoticeResource(Notice::create($data)), 201);
    }

    public function classUpdate(Request $request, string $classId, string $noticeId)
    {
        $notice = Notice::where('student_class_id', $classId)->findOrFail($noticeId);
        $notice->update($request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]));

        return new NoticeResource($notice);
    }

    public function classDestroy(string $classId, string $noticeId)
    {
        Notice::where('student_class_id', $classId)->findOrFail($noticeId)->delete();

        return response()->noContent();
    }

    private function authorizeClassAccess(Request $request, string $classId): void
    {
        if ($request->user()->is_admin) {
            return;
        }

        abort_unless(
            StudentEnrollment::where('user_id', $request->user()->id)
                ->where('student_class_id', $classId)
                ->exists(),
            403,
            'You are not enrolled in this class.'
        );
    }
}
