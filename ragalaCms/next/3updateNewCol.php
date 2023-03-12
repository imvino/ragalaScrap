<?php
include('db.php');
//function removeBracket()
//{
//    $tables = ['articles_editorial' => ['movieName'],
//        'articles_interviews' => ['filmPersonal', 'movieName'],
//        'articles_news' => ['filmPersonals', 'movieName'],
//        'articles_press_releases' => ['localLocation', 'movieName', 'mediaAgency'],
//        'local_events_events' => ['filmPersonals'],
//        'local_events_location' => ['locationCategory', 'city'],
//        'local_events_schedule' => ['evenLocationName'],
//        'movies_function' => ['movieName'],
//        'movies_names_title' => ['filmPersonals', 'ottPlatform'], //genre
//        'movies_photos' => ['movieName'],
//        'movies_poster' => ['movieName'],
//        'movies_reviews' => ['movieName'],
//        'starzone_filmpersonal' => ['category'],
//        'starzone_photos' => ['filmPersonalName'],
//        'starzone_photos' => ['languagesWorked'],
//    ];
//
//    foreach ($tables as $tbl => $k) {
//        var_dump($tbl);
//        foreach ($k as $col) {
//            var_dump($col);
//            //
//            $q1 = mysqli_query($GLOBALS['con'], "SELECT `rid`, $col FROM $tbl where $col like '%[%' or $col like '%]%' limit 100000 offset 0") or die(mysqli_error($GLOBALS['con']));
//
//            while ($r1 = mysqli_fetch_assoc($q1)) {
//                $rm = substr($r1[$col], 1, -1);
//                $rm = $rm == '' ? 'NULL' : "'$rm'";
//
//                $up = "UPDATE $tbl SET $col = $rm where rid='{$r1['rid']}' ";
//                echo $up;
//                $q2 = mysqli_query($GLOBALS['con'], $up) or die(mysqli_error($GLOBALS['con']));
//                if ($q2) {
//                    echo 'UPDATEd <br>';
//                }
//            }
//        }
//
//    }
//}

//function updateDate()
//{
//// new = old
////'articles_interviews' => [ 'date', 'rdate' ],
////'local_events_events' => [ 'date', 'rdate' ],
////'local_events_events_update' => [ 'added_date', 'addedDate' ],
////'movies_function' => [ 'date', 'rdate' ],
////'movies_function_update' => [ 'updatedOn', 'updatedDateTime' ],
////'movies_names_title' => [ 'release_Date', 'releaseDate' ],
////'local_events_schedule' => [ 'event_start_date', 'eventStartDate' ],
////'local_events_schedule' => [ 'event_end_date', 'eventEndDate' ],
//// 'starzone_filmpersonal' => ['birthday_new', 'birthday'],
////'movies_photos' => [ 'date', 'rdate' ],
////'movies_photos_update' => [ 'updatedOn', 'updatedDateTime' ],
////'movies_poster' => [ 'date', 'rdate' ],
////'starzone_photos' => [ 'date', 'rdate' ],
////'starzone_photo_update' => [ 'dateTime', 'addedDateTime' ],
//
//    $tables = [
//        'local_events_schedule' => ['event_start_date', 'eventStartDate'],
//        // 'local_events_schedule' => [ 'event_end_date', 'eventEndDate' ],
//
//    ];
//
//    $i = 0;
//    foreach ($tables as $tbl => $k) {
//
//        $newCol = $k[0];
//        $oldCol = $k[1];
//        $q = "SHOW COLUMNS FROM `$tbl` LIKE '$newCol'";
//        var_dump($q);
//        $result = mysqli_query($GLOBALS['con'], $q);
//        $exists = (mysqli_num_rows($result)) ? TRUE : FALSE;
//        if (!$exists) {
//            //echo ;
//            $q2 = "ALTER TABLE `$tbl` ADD COLUMN `$newCol` DATETIME NULL DEFAULT NULL AFTER `$oldCol`;";
//            var_dump($q2);
//            $result = mysqli_query($GLOBALS['con'], $q2);
//            if ($result) echo 'inserted table <br>';
//            //ALTER TABLE `articles_interviews`
//        } else {
//            echo 'table not inserted <br>';
//        }
////		if ( $i != 0 ) {
//        $q1 = mysqli_query($GLOBALS['con'], "SELECT `rid`, `$oldCol` FROM $tbl where $newCol is null LIMIT 100000") or die(mysqli_error($GLOBALS['con']));
//        while ($r1 = mysqli_fetch_assoc($q1)) {
//            $dateCon = $r1[$oldCol];
//            if ($dateCon) {
//                //$dateFrm='m/d/Y h:i:s A';
//                $dateFrm = 'm/d/Y';
//                $myDate = DateTime::createFromFormat($dateFrm, $dateCon);
//                if (!$myDate) echo 'invalid date';
//                $newDate = $myDate->format('Y-m-d H:i:s');
//                $up = "UPDATE $tbl SET $newCol = '$newDate' where rid='{$r1['rid']}' ";
//                $q2 = mysqli_query($GLOBALS['con'], $up) or die(mysqli_error($GLOBALS['con']));
//                if ($q2) {
//                    echo $r1['rid'] . ' UPDATEd <br>';
//                }
//            }
//
//        }
//
////		} else {
////			$up = "UPDATE `$tbl` SET `$newCol` = `$oldCol` WHERE `rid`=`rid`";
////			echo( $i . $up . '<br>' );
////		}
//
//        //$result = mysqli_query($GLOBALS[ 'con' ],  $up);
//        $i++;
//    }
//}

function updateNewCol()
{
    // new = old
    $tables = [
        'articles_editorial' => ['movie_name', 'movieName',],
        'articles_interviews' => [['film_personal', 'filmPersonal'], ['movie_name', 'movieName']],
        'articles_press_releases' => [['local_location', 'localLocation'], ['movie_name', 'movieName']],
        'articles_news' => ['movie_name', 'movieName',],
        'local_events_events' => ['event_location_name', 'eventLocationName',],
        'local_events_location' => ['location_category', 'locationCategory',],
        'local_events_schedule' => ['even_location_name', 'evenLocationName',],
        'movies_poster' => ['movie_name', 'movieName',],
        'movies_reviews' => ['movie_name', 'movieName',],
        'movies_function' => ['movie_name', 'movieName',],
        'movies_photos' => ['movie_name', 'movieName',],
        'starzone_photos' => ['film_personal_name', 'filmPersonalName',],
    ];
    var_dump($tables);
    foreach ($tables as $tbl => $k) {
        $newCol = $k[0];
        $oldCol = $k[1];

        if (!is_array($k[0])) {
            $up = "UPDATE `$tbl` SET `$newCol` = `$oldCol` WHERE `rid`=`rid` and $newCol is null";
            //  echo $up . '<br>';
            $q2 = mysqli_query($GLOBALS['con_cms'], $up) or die(mysqli_error($GLOBALS['con_cms']));
            var_dump($q2);
        } else {
            foreach ($k as $val) {
                $newCol = $val[0];
                $oldCol = $val[1];
                $up = "UPDATE `$tbl` SET `$newCol` = `$oldCol` WHERE `rid`=`rid` and $newCol is null";
                // echo $up . '<br>';
                $q2 = mysqli_query($GLOBALS['con_cms'], $up) or die(mysqli_error($GLOBALS['con_cms']));
                var_dump($q2);

            }
        }

//		if ( $q2 ) {
//			echo 'UPDATEd <br>';
//		}
    }
}
//ALTER TABLE `starzone_filmpersonal_category` ADD PRIMARY KEY (rid);
function updateNewColArray()
{
    // linkdb, ref,
    // mref,maincol
    $table = [
    //  'articles_news' => ['link_articles_news_starzone_filmpersonal', 'starzone_filmpersonal_rid', 'articles_news_rid', 'filmPersonals',],
      'local_events_events' => ['link_local_events_events_starzone_filmpersonal', 'starzone_filmpersonal_rid', 'local_events_events_rid', 'filmPersonals',],
   // 'movies_names_title' => ['link_movies_names_title_starzone_filmpersonal', 'starzone_filmpersonal_rid', 'movies_names_title_rid', 'filmPersonals',],
    //  'starzone_filmpersonal' => ['link_starzone_filmpersonal_starzone_filmpersonal_category', 'starzone_filmpersonal_category_rid', 'starzone_filmpersonal_rid', 'category',],
    ];

    foreach ($table as $tbl => $k) {
        $m1=  mysqli_query($GLOBALS['con_cms'],"SELECT max(rid) FROM `$tbl` WHERE 1") or die(mysqli_error($GLOBALS['con_cms']));
        $rm1 = mysqli_fetch_assoc($m1); $rid=($rm1['max(rid)']-1000);
        $sel1 = "SELECT rid, `$k[3]` FROM `$tbl` where  `$k[3]` is not null  and rid > $rid ";
 //       $sel1 = "SELECT rid, `$k[3]` FROM `$tbl` where  `$k[3]` is not null order by rid desc ";
        echo $sel1 . "<br>";
        $q1 = mysqli_query($GLOBALS['con_cms'], $sel1) or die(mysqli_error($GLOBALS['con_cms']));
        while ($r1 = mysqli_fetch_assoc($q1)) {
            //  var_dump($r1);
            $ary = explode(',', $r1[$k[3]]);
            if (count($ary) != 0) {
                foreach ($ary as $val) {
                    $sel = "SELECT count(*) FROM `$k[0]` where `$k[1]` = '$val' and `$k[2]` = '{$r1['rid']}'";
                    $q2 = mysqli_query($GLOBALS['con_cms'], $sel) or die(mysqli_error($GLOBALS['con_cms']));
                    $r2 = mysqli_fetch_assoc($q2);
                    if ($r2['count(*)'] == 0) {
                        echo $sel . "<br>";
                        $q3 = mysqli_query($GLOBALS['con_cms'], "INSERT INTO `$k[0]` (`$k[1]`,`$k[2]`) VALUES ('$val','{$r1['rid']}')") or die(mysqli_error($GLOBALS['con_cms']));

                    } else {
                        echo $tbl.' not inserted <br>';
                    }
                    // echo '============================================== <br>';
                }
            }
            // mysqli_query($GLOBALS['con_cms'], "UPDATE `$tbl` SET `$k[3]` = null WHERE `rid`={$r1['rid']} ") or die(mysqli_error($GLOBALS['con_cms']));
        }
    }

}

//function fix()
//{
//    $q1 = mysqli_query($GLOBALS['con_old'], "SELECT rid, `updatedDate` FROM `local_events_events` where working = '200'") or die(mysqli_error($GLOBALS['con_old']));
//    while ($r1 = mysqli_fetch_assoc($q1)) {
//        $q2 = mysqli_query($GLOBALS['con'], "UPDATE `local_events_events`  SET updatedDate = '{$r1['updatedDate']}' where rid='{$r1['rid']}' and updatedDate is null ") or die(mysqli_error($GLOBALS['con']));
//        if ($q2) {
//            echo $r1['rid'] . ' UPDATEd <br>';
//        }
//    }
//}

function copyFromOld()
{
// new = old
    $tables = [
       // 'local_events_events' => 'filmPersonals',
       // 'articles_news' => 'filmPersonals',
       // 'movies_names_title' => 'filmPersonals',
    ];
    foreach ($tables as $tbl => $k) {
        echo $tbl;
        $q1 = mysqli_query($GLOBALS['con_cms'], "SELECT rid, `$k` FROM `$tbl` where `$k` is null order by rid desc") or die(mysqli_error($GLOBALS['con_cms']));
        while ($r1 = mysqli_fetch_assoc($q1)) {
            $q2 = mysqli_query($GLOBALS['con_old'], "SELECT rid, `$k` FROM `$tbl` where rid='{$r1['rid']}'") or die(mysqli_error($GLOBALS['con_old']));
            $r2 = mysqli_fetch_assoc($q2);
           $up= "UPDATE `$tbl`  SET ".$k." = NULLIF ('{$r2[$k]}','') where rid='{$r1['rid']}'";
          // echo $up.'<br>';
            $q2 = mysqli_query($GLOBALS['con_cms'], $up) or die(mysqli_error($GLOBALS['con_cms']));
            if ($q2) {
                echo $r1['rid'] . ' UPDATEd <br>';
            }
        }
    }
}

//1st
//updateNewCol()
//2nd
updateNewColArray()


?>






