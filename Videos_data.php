<?php include 'Videos_data.php'; ?>
<?php
    ini_set('memory_limit', '1024M'); // 1GB
class Videos_data{
    public function categoryVideos(){
        $videoCategories = [
           
            'commercial_video' => [
                'label' => 'Commercial Video',
                'video' => [
                    [
                        'id' => 'commercial-video-1',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1724756010/videos/commercial%20video/iwn0jk7uby202thjhk1g.mp4'
                    ],
                    [
                        'id' => 'commercial-video-2',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1725122046/Subhshree_Bricks_Video_znp7ft.mp4'
                    ]
                ]
            ],
          
            'concert_video' => [
                'label' => 'Concert Video',
                'video' => [
                    [
                        'id' => 'concert-video-1',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1724758194/videos/concert%20reel/cueobh9dirm9cabbrdc1.mp4'
                    ],
                    [
                        'id' => 'concert-video-2',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1724757895/videos/concert%20reel/vbnmlwpupvv3lar2rejd.mp4'
                    ]
                ]
            ],
            
            'birthday_highlight' => [
                'label' => 'Birthday Highlight',
                'video' => [
                    [
                        'id' => 'birthday-highlight-1',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1725122890/Samaira_6Th_Bddy_Highlight_szujlc.mp4'
                    ],
                    [
                        'id' => 'birthday-highlight-2',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1725122845/Rudra_s_Birthday_Video_glwgds.mp4'
                    ],
                    [
                        'id' => 'birthday-highlight-3',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1725095337/Zoohan_Wonderland_Video_c7uwr6.mp4'
                    ],
                    [
                        'id' => 'birthday-highlight-4',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1724761981/videos/birthday%20highlight/jnu94fktbqotesfxleny.mp4'
                    ],
                    [
                        'id' => 'birthday-highlight-5',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1724757435/videos/birthday%20highlight/tzqbafrfyg94f4q4rdap.mp4'
                    ],
                    [
                        'id' => 'birthday-highlight-6',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1724757345/videos/birthday%20highlight/vxtp57lth8lxl5hkrphc.mp4'
                    ]
                ]
            ],

            'wedding_highlight' => [
                'label' => 'Wedding Highlight',
                'video' => [
                    [
                        'id' => 'wedding-highlight-1',
                        'video_src' => 'https://res.cloudinary.com/visualsofashii/video/upload/v1724763946/videos/wedding%20highlight/dbfx9xqbgphomizt03s9.mp4'
                    ]
                ]
            ]
        ];
        return $videoCategories;
    }
}

