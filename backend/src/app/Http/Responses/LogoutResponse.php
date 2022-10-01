<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;
use App\User;

class LogoutResponse implements LogoutResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        $reset =  $request->input('resetTest');
        if ( $reset ) {
            User::where('username', 'cy_email@test.dk')->delete();
        }

        return response()->json([
            'status'=>true,
            'reset' =>$reset,
            'message' => 'Logout successfully',
        ], 200);
    }
}