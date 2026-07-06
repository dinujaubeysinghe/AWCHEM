<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Notice;
use App\Http\Resources\NoticeResource;

class NoticeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    return NoticeResource::collection(
        Notice::orderBy('id', 'desc')->paginate(10)
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
    public function show(string $id)
    {
        $notice = Notice::findOrFail($id);
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
}
