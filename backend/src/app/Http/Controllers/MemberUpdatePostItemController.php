<?php

namespace App\Http\Controllers;

use App\MemberUpdatePostItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MemberUpdatePostItemController extends Controller
{
    public function index() {
        return response()->json(MemberUpdatePostItem::all(), 200);
    }

    public function store( Request $request ) {
        return $this->update( $request );
    }

    public function update( Request $request, int $id = null ) {

        $verified = $request->validate([
            'username' => ['required'],
            'name' => [],
            'pronouns' => []
        ]);

        if ( $id ) {
            $member =  MemberUpdatePostItem::find( $id );
            $message = 'Member updated succesfully';
        } else {
            $member = new MemberUpdatePostItem();
            $message = 'Member created succesfully';
        } 
        
        $member->username = $verified['username'];
        $member->name = empty( $verified['name'] ) ? null : $verified['name'];
        $member->pronouns = empty( $verified['pronouns'] ) ? null : $verified['pronouns'];

        $member->save();

        return response()->json([
            'status'=>true,
            'message' => $message,
            'request' => $request,
            'verified' => $verified,
        ], 200);

    }
 
    public function getPostContent( Request $request ) {

        $postContent_c = MemberUpdatePostItem::all()->map( function( $postItem ) {
            
            $pronouns = '';
            if (!empty($postItem->pronouns)) {
                $pronouns .= ', ' . $postItem->pronouns;
            }

            $postItemContent = '';
            if ( !empty($postItem->name)) {
                $postItemContent = $postItem->name . $pronouns . ' (@' . $postItem->username . ')';
            } else {
                $postItemContent = '@' . $postItem->username . $pronouns;
            }

            return $postItemContent;

        });

        $postContent = implode("\n", $postContent_c->toArray()) ?? '';

        return response()->json([
            'status'=>true,
            'data' => $postContent,
        ], 200);
    }

    public function confirmUpdateSent( Request $request ) {
        
        DB::table('member_update_post_items')->truncate();

        return response()->json([
            'status'=>true,
            'message' => 'Update was confirmed sent.',
        ], 200);
    }

    public function edit( Request $request, int $id ) {
        return response()->json(MemberUpdatePostItem::find( $id ), 200);
    }
}
