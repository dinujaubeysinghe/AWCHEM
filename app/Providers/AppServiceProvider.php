<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Override the password reset URL to point to the React frontend.
        // Without this, Laravel tries to resolve the named route "password.reset"
        // which does not exist in this API-only setup, causing a 500 error.
        ResetPassword::createUrlUsing(function ($user, string $token) {
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
            return "{$frontendUrl}/reset-password?token={$token}&email=" . urlencode($user->email);
        });
    }
}
