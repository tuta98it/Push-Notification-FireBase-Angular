import { Component, OnInit } from '@angular/core';
// Start: test notification firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { BehaviorSubject } from 'rxjs';
import { PushNotificationService } from './services/push-notification.service';
const firebaseConfig = {
  apiKey: "AIzaSyDNB80u8h4NeObR5jTB0bPGXnjB4tiQyLk",
  authDomain: "notify-erp-test.firebaseapp.com",
  projectId: "notify-erp-test",
  storageBucket: "notify-erp-test.appspot.com",
  messagingSenderId: "940138555541",
  appId: "1:940138555541:web:41420c65b3fa482546139c",
  measurementId: "G-T480HZX4TY"
};



// onBackgroundMessage(messaging, (payload) => {
//   console.log("Message received:", payload);
//   // You can handle the received message here
// });
// End
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  app: any;
  messaging: any;
  currentMessage = new BehaviorSubject(null);
  constructor(private pushNotificationService: PushNotificationService) {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    // analytics = getAnalytics(app);
    this.messaging = getMessaging(this.app);
  }

  private requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Get FCM token
        getToken(this.messaging, { vapidKey: 'BF3TuHpnSXxXeRpZTOqFkycAJAaSypORLQTbfpIvL-7bWWkG657Um8sdd-ZlCOu7gxuwus43i73yLU7wcB8LW-E' }).then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log('FCM Token:', currentToken);
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
          }
        }).catch((err) => {
          console.error('An error occurred while retrieving token:', err);
        });
      } else {
        console.warn('Notification permission denied.');
      }
    });
  }

  ngOnInit(): void {
    this.requestPermission();
    // Handle incoming messages (push notifications)
    onMessage(this.messaging, (payloadNotity) => {
      console.log('Message received. ', payloadNotity);
      const notification = payloadNotity.notification;
      this.pushNotificationService.create(notification?.title ?? '', { body: notification?.body}).subscribe();
      // ...
    });
  }

  title = 'push-notification';
}

