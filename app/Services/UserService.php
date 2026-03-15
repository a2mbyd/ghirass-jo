<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    public function getAll(): Collection
    {
        return User::query()
            ->orderBy('created_at', 'desc')
            ->get(['id', 'username', 'unhashed_password', 'role', 'created_at']);
    }

    public function find(int|string $id): User
    {
        return User::findOrFail($id);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): User
    {
        return User::create([
            'username' => $data['username'],
            'password' => $data['password'],
            'unhashed_password' => $data['password'],
            'role' => config('user.default_role'),
        ]);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(User $user, array $data): void
    {
        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['unhashed_password'] = $data['password'];
        }

        $user->update($data);
    }

    public function delete(User $user): void
    {
        $user->delete();
    }
}
