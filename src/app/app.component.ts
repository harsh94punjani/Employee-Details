import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as data from '../assets/employees_Details.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Employees-Dachboard';
  Teams: any = [
    'Product Team',
    'IDC',
    'OCBC',
    'Radian',
    'Rustify',
    'Chosse Team',
  ];
  Department: any = [
    'Front End Development',
    'Full stack developer',
    'ML Engineering',
    'HR',
    'QA',
    'R&D',
  ];
  selectedDepartment = this.Department[0];

  roleType: any = ['Full time', 'Part time', 'Contract based'];
  selectedRoleType = this.roleType[0];

  designation: any = [
    'Senior UI Developer',
    'Team Lead',
    'Manager',
    'Fresher',
    'Software Engineer',
  ];
  selectedDesignation = this.designation[0];

  experience: any = [
    '2 years',
    '3 years',
    '4 years',
    '5 years',
    '6 years',
    '7 years',
  ];
  selectedExperience = this.experience[0];

  yearofJoining: any = [
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
  ];
  selectedyearofJoining = this.yearofJoining[0];

  location: any = ['Bangalore', 'Gujarat', 'Kolkata', 'Mumbai', 'Delhi'];
  selectedLocation = this.location[0];
  visible = false;
  selected: any;
  starRating = 3;
  retString: any;
  selectedTeam: string = this.Teams[5];
  employeeDetails: any = [];
  isOnlyBangaloreEmp: boolean = false;
  url: string = '../assets/employees_Details.json';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEmployeeData();
  }
  toggleCollapse(): void {
    this.visible = !this.visible;
  }
  onCheckboxChange(event: any) {
    if (event.target.checked == true) {
      this.isOnlyBangaloreEmp = event.target.checked;
      this.employeeDetails = this.employeeDetails.filter((data: any) => {
        return data.emp_location == 'Bangalore';
      });
    } else {
      this.getEmployeeData();
    }
  }

  getEmployeeData() {
    this.http.get(this.url).subscribe((res) => {
      this.employeeDetails = res;
      console.log('--- result :: ', this.employeeDetails);
      localStorage.setItem('emp_detail', JSON.stringify(this.employeeDetails));
    });
  }
  changeTeam() {
    this.retString = localStorage.getItem('emp_detail');
    this.employeeDetails = [];
    this.employeeDetails = JSON.parse(this.retString);
    console.log(JSON.parse(this.retString));
    if (this.selectedTeam !== 'Chosse Team') {
      this.employeeDetails = this.employeeDetails.filter((data: any) => {
        return data.emp_team == this.selectedTeam;
      });
    } else {
      this.getEmployeeData();
    }
  }

  CancleFilter() {
    this.visible = false;
  }

  submitFilter() {
    console.log('submit.....filter')
    this.retString = localStorage.getItem('emp_detail');
    this.employeeDetails = [];
    this.employeeDetails = JSON.parse(this.retString);
    this.employeeDetails = this.employeeDetails.filter((data: any) => {
      return (data.emp_team == this.selectedTeam && data.emp_department == this.selectedDepartment && data.emp_designation == this.selectedDesignation &&
              data.emp_experience == this.selectedExperience && data.emp_location == this.selectedLocation && data.emp_roleType == this.selectedRoleType &&
       data.emp_dateOfJoining == this.selectedyearofJoining)
    });

  }
}
