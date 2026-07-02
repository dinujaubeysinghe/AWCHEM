<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['first_name' => 'Pradeep', 'last_name' => 'Silva', 'email' => 'pradeep.silva@example.com'],
            ['first_name' => 'Kumara', 'last_name' => 'De Silva', 'email' => 'kumara.desilva@example.com'],
            ['first_name' => 'Anura', 'last_name' => 'Fernando', 'email' => 'anura.fernando@example.com'],
            ['first_name' => 'Samantha', 'last_name' => 'Perera', 'email' => 'samantha.perera@example.com'],
            ['first_name' => 'Chandrika', 'last_name' => 'Gunawardana', 'email' => 'chandrika.gunawardana@example.com'],
            ['first_name' => 'Lakshmi', 'last_name' => 'Wijesinghe', 'email' => 'lakshmi.wijesinghe@example.com'],
            ['first_name' => 'Ravi', 'last_name' => 'Jayawardena', 'email' => 'ravi.jayawardena@example.com'],
            ['first_name' => 'Dilshan', 'last_name' => 'Bandara', 'email' => 'dilshan.bandara@example.com'],
            ['first_name' => 'Chaminda', 'last_name' => 'Dissanayake', 'email' => 'chaminda.dissanayake@example.com'],
            ['first_name' => 'Arjun', 'last_name' => 'Hettiarachchi', 'email' => 'arjun.hettiarachchi@example.com'],
            ['first_name' => 'Suresh', 'last_name' => 'Silva', 'email' => 'suresh.silva@example.com'],
            ['first_name' => 'Nimal', 'last_name' => 'De Silva', 'email' => 'nimal.desilva@example.com'],
            ['first_name' => 'Mahesh', 'last_name' => 'Fernando', 'email' => 'mahesh.fernando@example.com'],
            ['first_name' => 'Sanjeewa', 'last_name' => 'Perera', 'email' => 'sanjeewa.perera@example.com'],
            ['first_name' => 'Uditha', 'last_name' => 'Gunawardana', 'email' => 'uditha.gunawardana@example.com'],
            ['first_name' => 'Kaveri', 'last_name' => 'Wijesinghe', 'email' => 'kaveri.wijesinghe@example.com'],
            ['first_name' => 'Malini', 'last_name' => 'Jayawardena', 'email' => 'malini.jayawardena@example.com'],
            ['first_name' => 'Anuradha', 'last_name' => 'Bandara', 'email' => 'anuradha.bandara@example.com'],
            ['first_name' => 'Sujith', 'last_name' => 'Dissanayake', 'email' => 'sujith.dissanayake@example.com'],
            ['first_name' => 'Harsha', 'last_name' => 'Hettiarachchi', 'email' => 'harsha.hettiarachchi@example.com'],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'first_name' => $userData['first_name'],
                    'last_name' => $userData['last_name'],
                    'email' => $userData['email'],
                    'password' => bcrypt('Test@123'),
                    'is_admin' => false,
                ]
            );
        }
    }
}
