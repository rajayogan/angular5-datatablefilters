import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class StudentService {

  constructor(private afs: AngularFirestore) { }

  addStudent(studentData) {
    this.afs.collection('students').add(studentData).then(() => {
      console.log('Done');
    })
  }

  getStudents() {
    return this.afs.collection('students').valueChanges();
  }

  filterData(customfilters) {
    return new Promise((resolve, reject) => {
      if (customfilters.criteria == '')
        reject();
      if (customfilters.filtervalue == '')
        reject();
      resolve(this.afs.collection('students', ref =>
        ref.where(customfilters.field, customfilters.criteria, customfilters.filtervalue)).valueChanges());
    })
  }
}
