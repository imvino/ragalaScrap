<?php
include ('db.php');

function txtcleaner( $value ) {
	$value = str_replace( '—', '-', $value );
	$value = str_replace( '‒', '-', $value );
	$value = str_replace( '―', '-', $value );
	$value = str_replace( '_', '-', $value );
	$value = str_replace( ' ', '-', $value );
	$accents = array( 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'ŉ', 'Ō', 'ō', 'Ŏ', 'ŏ', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ', 'ƒ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ǎ', 'ǎ', 'Ǐ', 'ǐ', 'Ǒ', 'ǒ', 'Ǔ', 'ǔ', 'Ǖ', 'ǖ', 'Ǘ', 'ǘ', 'Ǚ', 'ǚ', 'Ǜ', 'ǜ', 'Ǻ', 'ǻ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ', 'Ά', 'ά', 'Έ', 'έ', 'Ό', 'ό', 'Ώ', 'ώ', 'Ί', 'ί', 'ϊ', 'ΐ', 'Ύ', 'ύ', 'ϋ', 'ΰ', 'Ή', 'ή' );
	$noAccents = array( 'A', 'A', 'A', 'A', 'A', 'A', 'AE', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'D', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 's', 'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', 'A', 'a', 'A', 'a', 'A', 'a', 'C', 'c', 'C', 'c', 'C', 'c', 'C', 'c', 'D', 'd', 'D', 'd', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'G', 'g', 'G', 'g', 'G', 'g', 'G', 'g', 'H', 'h', 'H', 'h', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'IJ', 'ij', 'J', 'j', 'K', 'k', 'L', 'l', 'L', 'l', 'L', 'l', 'L', 'l', 'l', 'l', 'N', 'n', 'N', 'n', 'N', 'n', 'n', 'O', 'o', 'O', 'o', 'O', 'o', 'OE', 'oe', 'R', 'r', 'R', 'r', 'R', 'r', 'S', 's', 'S', 's', 'S', 's', 'S', 's', 'T', 't', 'T', 't', 'T', 't', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'W', 'w', 'Y', 'y', 'Y', 'Z', 'z', 'Z', 'z', 'Z', 'z', 's', 'f', 'O', 'o', 'U', 'u', 'A', 'a', 'I', 'i', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'A', 'a', 'AE', 'ae', 'O', 'o', 'Α', 'α', 'Ε', 'ε', 'Ο', 'ο', 'Ω', 'ω', 'Ι', 'ι', 'ι', 'ι', 'Υ', 'υ', 'υ', 'υ', 'Η', 'η' );
	$value = str_replace( $accents, $noAccents, $value );
	$value = preg_replace( '/[^A-Za-z0-9-]+/', '', $value );
	$value = strtolower( $value );
	do {
		$value = str_replace( '--', '-', $value );
	} while ( substr_count( $value, '--' ) > 0 );
	return $value;
}
//photos
//'local_events_events_update','movies_function_update,,'starzone_photo_update'


$tables = [ 'articles_editorial' => 'articles', 'articles_interviews' => 'celebrity-interview', 'articles_press_releases' => 'press-release', 'local_events_events' => 'localevents', 'movies_function' => 'functions', 'movies_names_title' => 'movies/info', 'movies_photos' => 'movies', 'movies_poster' => '', 'movies_reviews' => 'movies/review', 'starzone_filmpersonal' => 'stars/profile', 'starzone_photos' => '', 'articles_news' => 'tollywood-news-' ];
//
foreach ( $tables as $table => $key ) {
	echo  '<br>';
	echo  '<br>';
	echo $table . '<br>';

	    if($table == 'local_events_events') { $title ='eventLocationName'; }
		     elseif($table == 'movies_names_title'){  $title ='movieName'; }
			elseif($table === 'movies_poster'){  $title ='imageName';  }
			elseif($table === 'starzone_filmpersonal') {  $title ='name';  }
			elseif($table === 'starzone_photos') { $title ='title,gender'; }
			elseif($table === 'articles_press_releases') { $title ='heading';  }
			elseif($table === 'articles_news') { $title ='heading,rdate'; } else{ $title ='title';}


	$sql = mysqli_query( $con, "SELECT $title,rid ,permaLink FROM `" . $table . "` where web_url is NULL and working=200  " )or die( mysqli_error( $con ) );
	while ( $r = mysqli_fetch_assoc( $sql ) ) {

		if ( $title == 'imageName' ) {
			$url = '/posters/' . $r[ $title ] . '.aspx';
		} elseif ( $table == 'starzone_photos' ) {
			$gen = $r[ 'gender' ] == '0' ? 'actor' : 'actress';
			$permalink = $r[ 'permaLink' ] ? $r[ 'permaLink' ] : $r[ 'title' ];
			$url = '/' . $gen . '/' . $r[ 'rid' ] . '/' . txtcleaner( $permalink ) . '.aspx';
		}
		elseif ( $table == 'articles_news' ) {
			$date = strtolower( date( 'Y-F', strtotime( $r[ 'rdate' ] ) ) );
			$permalink = $r[ 'permaLink' ] ? $r[ 'permaLink' ] : $r[ 'heading' ];
			$url = '/' . $key . $date . '/' . $r[ 'rid' ] . '/' . txtcleaner( $permalink ) . '.aspx';
		}
		else {
			$permalink = $r[ 'permaLink' ] ? $r[ 'permaLink' ] : $r[ $title ];
			$url = '/' . $key . '/' . $r[ 'rid' ] . '/' . txtcleaner( $permalink ) . '.aspx';
		}

		mysqli_query( $con, "UPDATE `" . $table . "` SET web_url = '$url' where rid='{$r['rid']}' " )or die( mysqli_error( $con ) );
		echo $url . '<br>';
	}
}

//just run


?>
