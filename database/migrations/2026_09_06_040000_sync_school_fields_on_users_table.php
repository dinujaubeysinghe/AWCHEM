<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'school')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('school')->after('nic');
            });
        }

        if (! Schema::hasColumn('users', 'school_district')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('school_district')->after('school');
            });
        }
    }

    public function down(): void
    {
        $columns = array_filter([
            Schema::hasColumn('users', 'school') ? 'school' : null,
            Schema::hasColumn('users', 'school_district') ? 'school_district' : null,
        ]);

        if ($columns) {
            Schema::table('users', function (Blueprint $table) use ($columns) {
                $table->dropColumn($columns);
            });
        }
    }
};