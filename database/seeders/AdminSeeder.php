<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'asanka.w@gmail.com'],
            [
                'first_name' => 'Asanka',
                'last_name' => 'Wedisinghe',
                'password' => 'As@nka123',
                'is_admin' => true,
                'address' => 'N/A',
                'whatsapp' => 'N/A',
                'nic' => 'ADMIN000001',
                'guardian_name' => 'N/A',
                'guardian_phone' => 'N/A',
            ]
        );
    }
}
