export interface Props {
  type: string;
  payload: [] | string | number | Post;
}
export interface PostStore {
  posts: Post[];
  post: Post | undefined;
  loading: boolean;
}
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export interface AddPost {
  title: string;
  body: string;
}
export interface Store {
  post: PostStore;
}
