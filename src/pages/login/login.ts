import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, Loading, LoadingController , AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import  firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    email: any;
    password: any;
    loading: Loading;
    constructor(public navCtrl: NavController,
         public navParams: NavParams,
         public angfire: AngularFireAuth,
         public loadingCtrl: LoadingController
         ,
         private facebook: Facebook,
         private platform: Platform,
         private alertCtrl: AlertController
        ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    
    loginFacebook() {
        // if (this.platform.is('cordova')) {
        this.facebook.login(['email']).then( (response) => {
            const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);
      
            firebase.auth().signInWithCredential(facebookCredential)
              .then((success) => {
                console.log("Firebase success: " + JSON.stringify(success));
                // this.userProfile = success;
              })
              .catch((error) => {
                console.log("Firebase failure: " + JSON.stringify(error));
            });
      
          }).catch((error) => { console.log(error) });
      //www root code
        // this.angfire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        //     .then((res) => {
        //         console.log(res)
        //         this.navCtrl.push(HomePage);
        //     });
        // }
        // else{
        //     console.log("cordova not supported");
        // }
    }

    UserSignUp() {
        this.navCtrl.push(SignupPage);
    }
    showLoading() {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
        });
        this.loading.present();
    }
    showError(text) {
        this.loading.dismiss();
     
        let alert = this.alertCtrl.create({
          title: 'Fail',
          subTitle: text,
          buttons: ['OK']
        });
        // alert.present(prompt);
    }
    UserSignIn() {
        this.showLoading();
        this.angfire.auth.signInWithEmailAndPassword(this.email, this.password)
            .then(auth => {
                this.loading.dismiss().then( () => {
                    console.log("" + auth);
                    this.navCtrl.push(HomePage);
                });
            })
            .catch(err => {
                this.loading.dismiss().then( () => {
                    console.log("" + err);
                });
            });
    }

}
