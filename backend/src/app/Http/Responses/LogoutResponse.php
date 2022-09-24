<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;
use App\User;

class LogoutResponse implements LogoutResponseContract
{

    /**
     * @param  $request
     * @return mixed
     */
    public function toResponse($request)
    {
        $reset =  false;
        if ( $request->input('resetTest') === true ) {
            User::where('username', 'cy_email@test.dk')->delete();
            $reset = true;
        }
        return $request->wantsJson()
            ? response()->json([
                'status'=>true,
                'reset' =>$reset,
                'message' => 'Logout successfully',
            ], 200)
            : redirect('/');
    }

}