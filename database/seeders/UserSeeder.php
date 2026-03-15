<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $username = config('user.superuser.username');
        $password = config('user.superuser.password');

        if (! $username || ! $password) {
            return;
        }

        User::updateOrCreate(
            ['username' => $username],
            [
                'password' => $password,
                'role' => 'admin',
            ]
        );
    }
}
