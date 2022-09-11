<?php

namespace App\Http\Controllers;

use App\NewsletterPostItem;
use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function import (Request $request ) {

        $verified = $request->validate([
            'csvText' => ['required']
        ]);

        $csvRows = explode( "\n", $verified['csvText'] );
        $csvHeader = explode("\t", array_shift( $csvRows ) );
        
        $newsletter_post_items = [];
        foreach ($csvRows as $csvRow ) {

            $post = new Post();
            $newsletterPostItem = new NewsletterPostItem();
        
            $csvCols = explode("\t", $csvRow );

            foreach ( $csvCols as $i => $value ) {
                $key = $csvHeader[ $i ];

                if ( $key === 'date' ) {;

                    if ( preg_match('/(\d{2})-(\d{2})-(\d{4})/', $value, $m )) {
                        $value = "{$m[3]}-{$m[2]}-{$m[1]}";
                    } 

                    $post->createdDate = $value;
                } else if ( $key === 'link') {
                    $link = $value;
                    if ( preg_match( '/(\d+)/', $link, $m )) {
                        $key = 'sourceId';
                        $post->sourceId = $m[ 1 ];
                    } else {
                        $post->sourceId = 0;
                    }
                } else if ( $key === 'username') {
                    $newsletterPostItem->username = $value;
                } else if ( $key === 'text') {
                    $newsletterPostItem->text = $value;
                }
            }

            $post->save();

            $newsletterPostItem->post_id = $post->id;
            $newsletterPostItem->save();

        }

        return response()->json( $newsletterPostItem->id, 200);

    }
}
