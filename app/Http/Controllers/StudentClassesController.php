<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentClassesResource;
use App\Models\StudentClasses;
use Illuminate\Http\Request;

class StudentClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentClassesResource::collection(
            StudentClasses::query()
                ->orderBy('id', 'desc')
                ->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $date = $request->validate([
            'name' => 'required|string|max:100',
            'batch' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'day' => 'required|string|max:20',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'ong_unit' => 'required|string|max:100',
        ]);

        $studentClass = StudentClasses::create($date);
        return response(new StudentClassesResource($studentClass), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new StudentClassesResource(StudentClasses);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $date = $request->validate([
            'name' => 'required|string|max:100',
            'batch' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'day' => 'required|string|max:20',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'ong_unit' => 'required|string|max:100',
        ]);
        $studentClass = StudentClasses::findOrFail($id);
        $studentClass->update($date);
        return new StudentClassesResource($studentClass);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $studentClass = StudentClasses::findOrFail($id);
        $studentClass->delete();
        return response( "" , 204);
    }
}
