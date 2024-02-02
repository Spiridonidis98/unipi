import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() movieInfoEmitter: EventEmitter<any> = new EventEmitter();
  // movies = [
  //   {
  //     "id":0,
  //     "name":"POOR THINGS",
  //     "description":"Από τον δημιουργό Γιώργο Λάνθιμο και σε παραγωγή της Emma Stone, έρχεται η απίστευτη ιστορία και η φανταστική εξέλιξη της Bella Baxter (Stone), μιας νεαρής γυναίκας που ανασταίνεται χάρη στον ιδιοφυή και αντισυμβατικό επιστήμονα Δρ. Godwin Baxter (Willem Dafoe). Υπό την προστασία του Baxter, η Bella ανυπομονεί να μάθει. Διψασμένη από την εμπειρία που στερείται, η Bella το σκάει με τον Duncan Wedderburn (Mark Ruffalo), έναν ικανό και με αμβλυμμένη ηθική δικηγόρο, σε μια περιπέτεια περιπλάνησης σε όλες τις ηπείρους. Απελευθερωμένη από τις προκαταλήψεις και τα στεγανά της εποχής της, η Bella αποφασιστικά επιδιώκει να δώσει τη μάχη της για την ισότητα και την ελευθερία.",
  //     "duration":"141 λεπτά",
  //     "directors":"Yorgos Lanthimos",
  //     "writers":"Tony McNamara & Alasdair Gray",
  //     "actors":"Emma Stone, Mark Ruffalo, Ramy Youssef, Willem Dafoe",
  //     "category":"ΡΟΜΑΝΤΙΚΗ ΚΟΜΕΝΤΙ",
  //     "image":"assets/imgs/movies/POOR THINGS.jpg",
  //     "rating": 5
  //   },
	//   {
  //     "id":1,
  //     "name":"ΓΟΥΟΝΚΑ",
  //     "description":"Βασισμένη στον εκπληκτικό πρωταγωνιστή του εμβληματικού και δημοφιλούς βιβλίου «Ο Τσάρλι και το Εργοστάσιο Σοκολάτας» του Ρόαλντ Νταλ, η ταινία αφηγείται πώς ο μεγαλύτερος εφευρέτης, μάγος και σοκολατοποιός του κόσμου εξελίχθηκε στον Γουίλι Γουόνκα που όλοι ξέρουμε. Έρχεται μία μεθυστική μείξη μαγείας, μουσικής, πανδαιμόνιου, συναισθήματος και χιούμορ. Αυτό το αφοπλιστικό υπερθέαμα θα συστήσει στους θεατές τον νεαρό Γουίλι Γουόνκα, γεμάτο ιδέες και αποφασισμένο να αλλάξει τον κόσμο κομμάτι κομμάτι για να αποδείξει ότι τα καλύτερα πράγματα στη ζωή ξεκινούν με ένα όνειρο και ότι αν είσαι αρκετά τυχερός να συναντήσεις τον Γουίλι Γουόνκα, τότε όλα είναι δυνατά.",
  //     "duration":"116 λεπτά",
  //     "directors":"Paul King",
  //     "writers":"Simon Farnaby, Paul King & Roald Dahl",
  //     "actors":"Timothee Chalamet, Simon Farnaby, Rowan Atkinson, Sally Hawkins",
  //     "category":"ΟΙΚΟΓΕΝΕΙΑΚΗ",
  //     "image":"assets/imgs/movies/WONKA.jpg",
  //     "rating": 4
  //   },
	//   {
  //     "id":2,
  //     "name":"AQUAMAN: ΤΟ ΧΑΜΕΝΟ ΒΑΣΙΛΕΙΟ",
  //     "description":"Έχοντας αποτύχει να εξολοθρεύσει τον Aquaman την πρώτη φορά, ο Μπλακ Μάντα διψασμένος να πάρει εκδίκηση για τον θάνατο του πατέρα του, θα κάνει τα πάντα για να καταστρέψει επιτέλους τον Aquaman. Αυτή τη φορά, ο Μπλακ Μάντα είναι πιο ισχυρός από ποτέ έχοντας τιθασεύει τη δύναμη της μυθικής Μαύρης Τρίαινας, που εξαπολύει μία αρχαία και κακόβουλη δύναμη. Για να τον κατατροπώσει, ο Aquaman θα στραφεί στον φυλακισμένο αδελφό του Ορμ, τον πρώην βασιλιά της Ατλαντίδας, με στόχο να συνάψουν μία ανορθόδοξη συμμαχία. Μαζί, πρέπει να παραμερίσουν τις διαφορές τους για να προστατεύσουν το βασίλειο και να σώσουν την οικογένεια του Aquaman και τον κόσμο από τον αφανισμό.",
  //     "duration":"124 λεπτά",
  //     "directors":"James Wan",
  //     "writers":"David Leslie Johnson-McGoldrick, James Wan & Jason Momoa",
  //     "actors":"Jason Momoa, Yahya Abdul-Mateen II, Temuera Morrison",
  //     "category":"ΠΕΡΙΠΕΤΕΙΑ ΦΑΝΤΑΣΙΑΣ",
  //     "image":"assets/imgs/movies/AQUAMAN THE LOST KINGDOM.jpg",
  //     "rating": 3
  //   },
  //   {
  //     "id":3,
  //     "name":"ΕΝΑ ΤΑΞΙΔΙ ΓΙΑ ΠΑΠΙΕΣ",
  //     "description":"Μία οικογένεια από πρασινοκέφαλες πάπιες έχει βαλτώσει και ενώ ο μπαμπάς Μακ χαίρεται που έχει την οικογένεια του ασφαλή και κολλημένη για πάντα σε μία λίμνη της Νέας Αγγλίας, η μαμά Παμ λαχταράει να ταράξει τα νερά και να δείξει στα παιδιά της – τον έφηβο γιο Νταξ και τη μικρότερη κόρη Γκουέν- τον κόσμο ολόκληρο. Όταν μία οικογένεια από αποδημητικές πάπιες αποβιβάζεται στη λίμνη τους με συναρπαστικές ιστορίες από μέρη μακρινά, η Παμ πείθει τον Μακ να φύγουν για ένα οικογενειακό ταξίδι με προορισμό την τροπική Τζαμάικα και ενδιάμεση στάση τη Νέα Υόρκη. Καθώς η οικογένεια φτάνει στον Νότο για τον χειμώνα, τα σχέδια τους ανατρέπονται. Η εμπειρία θα τους εμπνεύσει να διευρύνουν τους ορίζοντες τους, να ανοιχτούν σε νέες φιλίες, να καταφέρουν πολλά περισσότερα από αυτά που φαντάζονταν και να μάθουν απρόσμενα πράγματα ο ένας για τον άλλον και για τον ίδιο τους τον εαυτό.",
  //     "duration":"92 λεπτά",
  //     "directors":"Benjamin Renner & Guylo Homsy",
  //     "writers":"Benjamin Renner & Mike White",
  //     "actors":"Elizabeth Banks, Kumail Nanjiani, David Mitchell",
  //     "category":"ΚΙΝΟΥΜΕΝΑ ΣΧΕΔΙΑ",
  //     "image":"assets/imgs/movies/MIGRATION.jpg",
  //     "rating": 3
  //   }
  // ]
  movies: any = [];
  constructor(private movieServ: MovieService) { }

  ngOnInit(): void {
    this.movieServ.getAllMovies().then( (response: any) => {
      this.movies = response;
    }).catch( error => {
      this.movies = [];
    })
  }

  //returns background img for every movie
  returnCSS(img: string) {
    return {
      'background-image': 'url("' + img + '")'
    }
  }

  openInfoModal(movie: any) {
    this.movieInfoEmitter.emit(movie)
  }

}
