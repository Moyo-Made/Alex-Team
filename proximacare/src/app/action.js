import { prisma } from "@/lib/prisma"
import axios from 'axios'
import {prisma} from '@/lib/prisma'
import { clerkClient, currentUser } from '@clerk/nextjs'
import { User } from '@prisma/client'

export default async  function deleteUser() {
    const user = prisma.user.delete({
        data : {
            user,
        },
        select : {
            user : true,
        }
    })
}

export const getAuthUserDetails = async () => {
    const user = await currentUser()
    if (!user) {
        return
    }
     const userData = await db.user.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress,
        }
     })

     return userData
}
export const NotificationUpdate = async({userId, cancerId}) => {
    const authUser = await currentUser()
    let userData
    if(!authUser) {
        const response = await prisma.user.findUnique({
            where: {
                User: {
                    some: { id: userId },
                }
            },
        })
        if(response){
            userData = response
        } else {
            userData = await db.user.findUnique({
                where : { email: authUser?.emailAddresses[0].emailAddress },
            })
        }
        if(!userData) {
            console.log('Could not find User')
            return
        }
        let foundId = userId

    }

}