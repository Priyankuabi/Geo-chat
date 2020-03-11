<template>
    <div class="view-profile container">
        <div v-if="profile" class="card">
            <h2 class="blue-text center">{{ profile.alias }}'s Wall Feed</h2>
            <ul class="messages collection">
                <li v-for="(message, index) in messages" :key="index">
                    <div class="blue-text">{{ message.from }}</div>
                    <div class="grey-text text-darken-2">{{ message.content }}</div>
                </li>
            </ul>
            <form @submit.prevent="addMessage">
                <div class="field">
                    <label for="message">Add a Message</label>
                    <input type="text" name="message" v-model="newMessage">
                    <p v-if="feedback" class="red-text center">{{ feedback }}</p>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'ViewProfile',
    data(){
        return{
            profile: null,
            newMessage: null,
            feedback: null,
            user: null,
            messages: []
        }
    },
    methods: {
        addMessage(){
            if(this.newMessage){
                this.feedback = null
                db.collection('messages').add({
                    to: this.$route.params.id,
                    from: this.user.alias,
                    content: this.newMessage,
                    time: Date.now()
                }).then(() => {
                    this.newMessage = null
                })
            }else{
                this.feedback = "You must enter a message to add it"
            }
        }
    },
    created(){
        let ref = db.collection('users')

        //get current user
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get().then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data()
                this.user.id = doc.id
            })
        })


        //messages
        db.collection('messages').where('to', '==', this.$route.params.id).onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    this.messages.unshift({
                        from: change.doc.data().from,
                        content: change.doc.data().content
                    })
                }
            })
        })

        //profile data
        ref.doc(this.$route.params.id).get().then(user => {
            this.profile = user.data()
        })
    }
}
</script>
<style>
.view-profile .card{
    padding: 20px;
    margin-top: 60px;
}
.view-profile h2{
    font-size: 2em;
    margin-top: 0;
}
.view-profile li{
    padding: 10px;
    border-bottom: 1px solid #eee;
}
</style>