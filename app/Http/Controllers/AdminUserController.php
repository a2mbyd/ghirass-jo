<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => $this->userService->getAll(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->userService->create($request->validated());

        return redirect()->route('admin.users.index')
            ->with('success', config('user.messages.created'));
    }

    public function edit(string $user_id): Response
    {
        $user = $this->userService->find($user_id);

        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'role' => $user->role,
                'unhashed_password' => $user->unhashed_password,
            ],
        ]);
    }

    public function update(UpdateUserRequest $request, string $user_id): RedirectResponse
    {
        $user = $this->userService->find($user_id);
        $this->userService->update($user, $request->validated());

        return redirect()->route('admin.users.index')
            ->with('success', config('user.messages.updated'));
    }

    public function destroy(string $user_id): RedirectResponse
    {
        $user = $this->userService->find($user_id);
        $this->userService->delete($user);

        return redirect()->route('admin.users.index')
            ->with('success', config('user.messages.deleted'));
    }
}
