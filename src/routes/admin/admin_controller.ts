import { generateAccessToken } from "../../modules/jwt";
import { Feedback, Waitlist } from "../user/user_model";
import { json2csv,json2csvAsync } from 'json-2-csv';

export const loginAdmin = async (payload) => {
  let { email, password } = payload;
  if (email === "evans@vzy.co" && password === "V3nzD4ta!x") {
    let token = generateAccessToken(email);
    return { user: email, token };
  } else {
    return false;
  }
};


export const getFeedBack = async(page=1)=>{
  let total = await Feedback.countDocuments({})
  let per_page=20;
  let current_page = page
  let last_page= Math.floor(total/per_page)+((total%per_page>0)?1:0);
  let next_page_url = (page<last_page?`/feedback?page=${page+1}`:'');
  let prev_page_url = (page>1?`/feedback?page=${page-1}`:'');
  let from=per_page*(page-1)+1;
  let to=per_page*page;
  let dat ={
      total,
      per_page,
      current_page,
      last_page,
      next_page_url,
      prev_page_url,
      from,
      to,
  }
  console.table(dat)
  let data = await Feedback.find().sort('-_id').skip(per_page*(page-1)).limit(per_page);
  console.log(data)
  let res ={
      total,
      per_page,
      current_page,
      last_page,
      next_page_url,
      prev_page_url,
      from,
      to,
      data
  }

  console.log(res);
  return(res);
}


export const getWaitlist = async(page=1)=>{
  let total = await Waitlist.countDocuments({})
  let per_page=20;
  let current_page = page
  let last_page= Math.floor(total/per_page)+((total%per_page>0)?1:0);
  let next_page_url = (page<last_page?`/feedback?page=${page+1}`:'');
  let prev_page_url = (page>1?`/feedback?page=${page-1}`:'');
  let from=per_page*(page-1)+1;
  let to=per_page*page;
  let dat ={
      total,
      per_page,
      current_page,
      last_page,
      next_page_url,
      prev_page_url,
      from,
      to,
  }
  console.table(dat)
  let data = await Waitlist.find().sort('-_id').skip(per_page*(page-1)).limit(per_page);
  console.log(data)
  let res ={
      total,
      per_page,
      current_page,
      last_page,
      next_page_url,
      prev_page_url,
      from,
      to,
      data
  }

  console.log(res);
  return(res);
}

export const downloadFeedback = async()=>{
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  let allFeedback =(await Feedback.find()).map((d: any) => {
    // console.log(d);
    let location='',duration='',date='';
    let {rating,feedback,email,device,model='',browser=''}=d

    if (d.location) {
      location = regionNames.of(d.location || "");
    }
    if (d.duration) {
      let s = Math.round(d.duration);
      let mins = Math.floor(s / 60);
      let secs = s % 60;
      
      duration = mins + "m " + secs + "s";
    }
    if (d.date) {
      let month = d.date.getMonth()+1
      let date_ = d.date.getDate()
      let year = d.date.getFullYear()
      
      // date = year+'-'+month+'-'+date_
      date = `${year}-${month}-${date_}`;
    }
    return {location,duration,date,rating,feedback,email,device,model,browser};
  });
  console.log(allFeedback)
  
  
  let csv = await json2csvAsync(allFeedback,{keys:[ 
    { field: 'rating', title: 'Rating' }, 
    { field: 'feedback', title: 'Feedback' },
    { field: 'email', title: 'Feedback' },
    { field: 'location', title: 'Location' },
    { field: 'device', title: 'Device' },
    { field: 'duration', title: 'Duration' },
    { field: 'date', title: 'Date' },
    { field: 'model', title: 'Model' },
    { field: 'browser', title: 'Browser' },

  ]})
    // console.log(csv)
    return csv
}

export const downloadWaitlist = async()=>{
  let allWaitlist =(await Waitlist.find()).map((d: any) => {
    let {email}=d
    let date=''
    if (d.date) {
      let month = d.date.getMonth()+1
      let date_ = d.date.getDate()
      let year = d.date.getFullYear()
      
      date = `${year}-${month}-${date_}`;
    }
    return {date,email};
  });
  console.log(allWaitlist)
  
  
  let csv = await json2csvAsync(allWaitlist,{keys:[
    { field: 'email', title: 'Email' },
    { field: 'date', title: 'Date' },
  ]})
    // console.log(csv)
    return csv
}