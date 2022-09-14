export interface IPost {
  _id?: any; //type objectid will be consider
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  content: string;
  guid: string; //delete it in model
  categories: Array<string>;
  isoDate: string; //make date type will be better
}

export interface IRssResponse {
  count: number;
  message: Array<IPost>;
}

export interface ISendPost {
  posts: Array<IPost>;
}
