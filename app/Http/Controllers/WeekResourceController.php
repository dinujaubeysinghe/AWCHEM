<?php

namespace App\Http\Controllers;

use App\Models\WeekResource;
use Illuminate\Http\Request;

class WeekResourceController extends Controller
{
    // Admin: add a PDF/link resource to a week
    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_week_id' => 'required|exists:class_weeks,id',
            'type' => 'required|in:pdf,link',
            'label' => 'required|string|max:255',
            'url' => 'required|url|max:2048',
        ]);

        $resource = WeekResource::create($validated);

        return response()->json($resource, 201);
    }

    // Admin: edit a resource
    public function update(Request $request, $id)
    {
        $resource = WeekResource::findOrFail($id);

        $validated = $request->validate([
            'type' => 'sometimes|required|in:pdf,link',
            'label' => 'sometimes|required|string|max:255',
            'url' => 'sometimes|required|url|max:2048',
        ]);

        $resource->update($validated);

        return response()->json($resource);
    }

    // Admin: delete a resource
    public function destroy($id)
    {
        $resource = WeekResource::findOrFail($id);
        $resource->delete();

        return response()->json(['message' => 'Resource deleted successfully.']);
    }
}