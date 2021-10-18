<?php
$servername = "localhost";$username = "root";$password = '';$db='ragalahari';
$conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
// set the PDO error mode to exception

function txtcleaner($value){$value=str_replace('—','-',$value);$value=str_replace('‒','-',$value);$value=str_replace('―','-',$value);$value=str_replace('_','-',$value);$value=str_replace(' ','-',$value);$accents=array('À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý','ß','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ñ','ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','ÿ','Ā','ā','Ă','ă','Ą','ą','Ć','ć','Ĉ','ĉ','Ċ','ċ','Č','č','Ď','ď','Đ','đ','Ē','ē','Ĕ','ĕ','Ė','ė','Ę','ę','Ě','ě','Ĝ','ĝ','Ğ','ğ','Ġ','ġ','Ģ','ģ','Ĥ','ĥ','Ħ','ħ','Ĩ','ĩ','Ī','ī','Ĭ','ĭ','Į','į','İ','ı','Ĳ','ĳ','Ĵ','ĵ','Ķ','ķ','Ĺ','ĺ','Ļ','ļ','Ľ','ľ','Ŀ','ŀ','Ł','ł','Ń','ń','Ņ','ņ','Ň','ň','ŉ','Ō','ō','Ŏ','ŏ','Ő','ő','Œ','œ','Ŕ','ŕ','Ŗ','ŗ','Ř','ř','Ś','ś','Ŝ','ŝ','Ş','ş','Š','š','Ţ','ţ','Ť','ť','Ŧ','ŧ','Ũ','ũ','Ū','ū','Ŭ','ŭ','Ů','ů','Ű','ű','Ų','ų','Ŵ','ŵ','Ŷ','ŷ','Ÿ','Ź','ź','Ż','ż','Ž','ž','ſ','ƒ','Ơ','ơ','Ư','ư','Ǎ','ǎ','Ǐ','ǐ','Ǒ','ǒ','Ǔ','ǔ','Ǖ','ǖ','Ǘ','ǘ','Ǚ','ǚ','Ǜ','ǜ','Ǻ','ǻ','Ǽ','ǽ','Ǿ','ǿ','Ά','ά','Έ','έ','Ό','ό','Ώ','ώ','Ί','ί','ϊ','ΐ','Ύ','ύ','ϋ','ΰ','Ή','ή');$noAccents=array('A','A','A','A','A','A','AE','C','E','E','E','E','I','I','I','I','D','N','O','O','O','O','O','O','U','U','U','U','Y','s','a','a','a','a','a','a','ae','c','e','e','e','e','i','i','i','i','n','o','o','o','o','o','o','u','u','u','u','y','y','A','a','A','a','A','a','C','c','C','c','C','c','C','c','D','d','D','d','E','e','E','e','E','e','E','e','E','e','G','g','G','g','G','g','G','g','H','h','H','h','I','i','I','i','I','i','I','i','I','i','IJ','ij','J','j','K','k','L','l','L','l','L','l','L','l','l','l','N','n','N','n','N','n','n','O','o','O','o','O','o','OE','oe','R','r','R','r','R','r','S','s','S','s','S','s','S','s','T','t','T','t','T','t','U','u','U','u','U','u','U','u','U','u','U','u','W','w','Y','y','Y','Z','z','Z','z','Z','z','s','f','O','o','U','u','A','a','I','i','O','o','U','u','U','u','U','u','U','u','U','u','A','a','AE','ae','O','o','Α','α','Ε','ε','Ο','ο','Ω','ω','Ι','ι','ι','ι','Υ','υ','υ','υ','Η','η');$value=str_replace($accents,$noAccents,$value);$value=preg_replace('/[^A-Za-z0-9-]+/','',$value);$value=strtolower($value);do{$value=str_replace('--','-',$value);}while(substr_count($value,'--')>0);return $value;}


try {
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

//order by id desc limit 10

function core($db,$url,$title=Null)
{
    if(!isset($title)){
        $title='title';
    }
    $sql = "SELECT  `$title`,`permalink`,`rid` FROM `$db` WHERE 1";
    $data = $GLOBALS['conn']->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    foreach ($data as $value) {
        if($value['permalink']=='') {
            echo "https://www.ragalahari.com/$url/" . $value['rid'] . "/" . txtcleaner($value[$title]) . ".aspx <br>";
        }else{
            echo "https://www.ragalahari.com/$url/" . $value['rid'] . "/" . txtcleaner($value['permalink']) . ".aspx <br>";
        }

    }
}

//movies
//core('movies_function','functions')
//core('movies_photos','movies')
//core('movies_names_title','movies/info','movieName')
//core('movies_reviews','movies/review')


//star zone
//core('starzone_filmpersonal','stars/profile','name')
//starzone_photos
function starzone_photos()
{
    $sql = "SELECT  `gender`,`permalink`,`rid` FROM `starzone_photos` WHERE 1";
    $data = $GLOBALS['conn']->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    foreach ($data as $value) {
        if($value['gender']==1) {
            echo "https://www.ragalahari.com/actress/" . $value['rid'] . "/" . txtcleaner($value['permalink']) . ".aspx <br>";
        }else{
            echo "https://www.ragalahari.com/actor/" . $value['rid'] . "/" . txtcleaner($value['permalink']) . ".aspx <br>";
        }

    }
}
//starzone_photos()
// local events
//core('local_events_events','localevents','eventname')
//news
function articles_news()
{
    $sql = "SELECT  `heading`,`permalink`,`rid`,`rdate` FROM `articles_news` WHERE 1";
    $data = $GLOBALS['conn']->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    foreach ($data as $value) {
		 $time = strtotime($value['rdate']);
		 $y = Date('Y',$time);
		 $m = strtolower(Date('M',$time));
        if($value['permalink']=='') {
            echo "https://www.ragalahari.com/tollywood-news-".$y."-".$m."/" . $value['rid'] . "/" . txtcleaner($value['heading']) . ".aspx <br>";
        }else{
            echo "https://www.ragalahari.com/tollywood-news-".$y."-".$m."/" . $value['rid'] . "/" . txtcleaner($value['permalink']) . ".aspx <br>";
        }

    }
}
//articles_news()

//articles
//core('articles_press_releases','pressreleases','heading')
//core('articles_interviews','interviews')
//core('articles_editorial','articles')




?>
