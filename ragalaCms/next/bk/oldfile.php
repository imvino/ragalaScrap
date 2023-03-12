<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$GLOBALS['con'] = mysqli_connect("localhost", "root", "", "ragalahari");
$GLOBALS['con_old'] = mysqli_connect("localhost", "root", "", "ragalahari_old");
$GLOBALS['con_cms'] = mysqli_connect("localhost", "root", "", "ragalacms");

function update2newCol()
{
    $tables = [
        // 'local_events_events' => ['path','imageAltText','imageTitleText','homepageTitleText','homepageTitleDropdown','addedDate','noOfPhotosPages','wasabi'],
        //'movies_function' => ['path', 'imageAltText', 'imageTitleText', 'homepageTitleText', 'homepageTitleDropdown', 'updatedDateTime', 'noOfPhotosPages', 'wasabi'],
        // 'movies_photos' => ['path', 'imageAltText', 'imageTitleText', 'homepageTitleText', 'homepageTitleDropdown', 'updatedDateTime', 'noOfPhotosPages', 'wasabi'],
        // 'starzone_photos' => ['path', 'imageAltText', 'imageTitleText', 'homepageTitleText', 'homepageTitleDropdown', 'addedDateTime', 'noOfPhotosPages', 'galleryType','wasabi'],

    ];

    foreach ($tables as $tbl => $k) {
        var_dump($tbl);
        foreach ($k as $col) {
            //  var_dump($col);
            //and working = 200
            $upTbl = $tbl . '_update';
            $sel1 = "SELECT  `rid` FROM `$tbl` where `$col` is null  ";
            echo $sel1 . '<br>';
            $q1 = mysqli_query($GLOBALS['con_cms'], $sel1) or die(mysqli_error($GLOBALS['con_cms']));
            while ($r1 = mysqli_fetch_assoc($q1)) {
                $sel2 = "SELECT  `$col` FROM `$upTbl` where `rid`='{$r1['rid']}'";
                //echo $sel2.'<br>';
                $q2 = mysqli_query($GLOBALS['con_cms'], $sel2) or die(mysqli_error($GLOBALS['con_cms']));
                while ($r2 = mysqli_fetch_assoc($q2)) {
                    // var_dump($r2);
                    $up = "UPDATE `$tbl` SET `$col` = '" . mysqli_real_escape_string($GLOBALS['con_cms'], $r2[$col]) . "' where rid={$r1['rid']} ";
                    echo $up;
                    $q3 = mysqli_query($GLOBALS['con_cms'], $up) or die(mysqli_error($GLOBALS['con_cms']));
                    if ($q3) {
                        echo 'UPDATEd <br>';
                    }
                }
            }
        }

    }
}

function transferCat2Gender(){
    echo 	'sdfsdfs';
    $sel1 = "SELECT  `rid`,`category` FROM `starzone_filmpersonal` WHERE `category` IS NOT NULL order by `rid` desc";
    $q1 = mysqli_query($GLOBALS['con'], $sel1) or die(mysqli_error($GLOBALS['con']));
    while ($r1 = mysqli_fetch_assoc($q1)) {
        $up = "UPDATE `starzone_photos` SET `catgen` = '" . mysqli_real_escape_string($GLOBALS['con_cms'], $r1['category']) . "' where filmPersonalName={$r1['rid']} ";
        echo  $up.'<br>';
        mysqli_query($GLOBALS['con_cms'], $up) or die(mysqli_error($GLOBALS['con_cms']));
    }

}
transferCat2Gender()

?>





