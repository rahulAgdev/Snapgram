import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createPost, createUserAccount, getRecentPosts, signInAccount, signOutAccount } from '../appwrite/api'
import { INewPost, INewUser } from '@/types'
import { QUERY_KEYS } from './queryKeys'

export const useCreateUserAccount = () =>{
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),
    })
}
export const useSignInAccount = () =>{
    return useMutation({
        mutationFn: (user: {email: string, password: string}) => signInAccount(user),
    })
}
export const useSignOutAccount = () =>{
    return useMutation({
        mutationFn: signOutAccount
    })
}
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            // we are invalidating it because whenever we refresh the page, we dont want the recent posts to be from the same cache that was shown before, but we want it to recall it from the fresh posts again.
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS] 

            })
        }
    })
}

// ============================== GET RECENT POSTS
export const useGetRecentPosts = () => {
    return useQuery({
      queryKey : [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn : getRecentPosts,
      
    })
  }