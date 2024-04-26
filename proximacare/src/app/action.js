import { prisma } from "@/lib/prisma"
import axios from 'axios'

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

export default async function handler (req, res){
    
}