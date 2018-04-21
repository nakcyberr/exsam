const _ = require('lodash');

// WARNING: beware object mutable

/**
 * @params {Object} store
 * @params {String} name
 * @params {Object} scores
 * @params {Number} scores{key}
 */
exports.updateStudentScore = (store, { name, scores }) => {
    // code here
    let isNewSubject = false;
    const data = _.map(store,(item)=>{
      const subjectPush = Object.keys(scores)
      if(subjectPush.includes(item.subject) && scores[item.subject]){
        let isOldstudent = false;
        const updateOldStudentScore = _.map(item.students , (student)=>{
            if(student.name === name){
                isOldstudent = true;
                student.score  = scores[item.subject]
                return student
            }else{
                return student
            }
        });
        const studentUpdate = !isOldstudent? 
            _.concat(item.students,{ name , score: scores[item.subject]}) 
            : updateOldStudentScore

        item.students = studentUpdate;
        return item
      }else{
        const newUpdateScoreStudents = _.remove(item.students,(o)=> o.name !== name)
        item.students = newUpdateScoreStudents;
        isNewSubject = true;
       return item
      }
    })

    if(isNewSubject){
        const updateNewSubject = Object.keys(scores).map((scoresSubject)=>{
            return {
                subject: scoresSubject, 
                students: [{ name , score: scores[scoresSubject] }]
            }
        })
        return _.concat(data,updateNewSubject)
    }else{
        return data
    }
};

/**
 * @params {Object} store
 * @params {String} name
 * @params {String} subject
 */
exports.removeStudentScoreBySubject = (store, { name, subject }) => {
    // code here
   const data = _.map(store , (item)=>{
        if(item.subject === subject){
            const removeStudentAndSubject = _.remove(item.students,(o)=> o.name !== name);
            item.students = removeStudentAndSubject;
            return item;
        }else{
           const eeeee =  _.map(item , (items)=>{
                 _.update(items, '[0].score', (n) => n-45)
                return item
            })
            return item;
        }
    })

    return store
};

/**
 * @params {Object} store
 */
exports.transformData = store => {
    // code here
};
