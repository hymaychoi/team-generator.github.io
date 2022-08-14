import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'team-generator-test';
  //initialize a state
  newMemberName:string='';
  members: string[] =[]; 
  errorMessage = '';
  numberOfTeams:number | '' = '';
  teams: string[][] = []
  
  onInput(member:string){
    this.newMemberName = member
  }

  onNumberOfTeamsInput(value:string){
    this.numberOfTeams = Number(value)
  }

  addMember(){
    if(!this.newMemberName) {
      this.errorMessage = "Name can't be empty"
      return
    }
    this.errorMessage = ""
    this.members.push(this.newMemberName)
    this.newMemberName=''
  }

  generateTeams(){
    if(!this.numberOfTeams || this.numberOfTeams<= 0) {
      this.errorMessage = "Invalid number of teams"
      return 
    }
    
    if(this.members.length < this.numberOfTeams){
      this.errorMessage = "Not enough members to generate teams"
      return
    }
    this.errorMessage=''

    //state should be only referenced, no mutation preferred
    const allMembers = [...this.members]
    while(allMembers.length){
      for(let i=0; i <this.numberOfTeams; i++){
        const randomIndex =Math.floor(Math.random() * allMembers.length)
        //splice returns a new array
        const member = allMembers.splice(randomIndex, 1)[0]
        //if member is undefined, break the loop
        if(!member)break;
        
        if(this.teams[i]) {
          this.teams[i].push(member)
        } else {
          // if there was no array in team array
          this.teams[i] = [member]
        }
      }
    //after generating teams some of the element should be empty
    }
    this.members = []
    this.numberOfTeams = ""
  }

  resetTeams(){
    this.teams=[]
  }
}
