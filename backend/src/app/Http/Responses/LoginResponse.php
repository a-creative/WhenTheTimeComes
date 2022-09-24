<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{

    /**
     * @param  $request
     * @return mixed
     */
    public function toResponse($request)
    {
        $user = Auth::user();
        $home = Auth::user()->is_admin ? config('fortify.dashboard') : config('fortify.home');

        return $request->wantsJson()
            ? response()->json([
                'status'=>true,
                'message' => 'Login successfully',
                'user' => [
                    'name' => $user->name,
                    'username' => $user->username,
                ],
            ], 200)
            : redirect($home);
    }

}