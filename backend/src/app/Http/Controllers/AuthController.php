<?php

namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\MemberUpdatePostItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
 
class AuthController extends Controller
{

    public function logout( Request $request ) {

        $reset =  false;
        if ( $request->input('resetTest') === true ) {
            User::where('username', 'cy_email@test.dk')->delete();
            MemberUpdatePostItem::where('username','cy_mu_username')->delete();
            $reset = true;
        }

        Auth::logout();
     
        $request->session()->invalidate();
     
        $request->session()->regenerateToken();

        return response()->json([
            'status'=>true,
            'reset' =>$reset,
            'message' => 'Logout successfully',
        ], 200);
    }

    public function login( Request $request ) {

        $credentials = $request->validate([
            'username' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt([ 'username' => $credentials['username'], 'password' => $credentials['password'] ])) {
            $request->session()->regenerate();

            $user = Auth::user(); 

            return response()->json([
                'status'=>true,
                'message' => 'Login successfully',
                'user' => [
                    'name' => $user->name,
                    'username' => $user->username,
                ],
            ], 200);
        }
 
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function register( Request $request ) {

        $validated = $request->validate([
            'username' => 'required|unique:App\User,username',
            'password' => ['required', 'confirmed', Password::min(8)],
            'name' => 'required',
        ]);
        
        $user = new User();
        $user->name = $validated['name'];
        $user->username = $validated['username'];
        $user->password = Hash::make( $validated['password'] );
        $user->save();

        return $user;
    }

}