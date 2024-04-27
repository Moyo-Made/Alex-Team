import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { NumberInput } from '@tremor/react'
import { v4 } from 'uuid'

import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '../ui/use-toast'

import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  deleteUser,
  initUser,
  saveActivityLogsNotification,
  updateUserDetails,
  upsertUser,
} from '@/lib/queries'
import { Button } from '@/components/ui/button'


const FormSchema = z.object({
  name: z.string().min(2, { message: 'User name must be atleast 2 chars.' }),
  Email: z.string().min(1),
  Phone: z.string().min(1),
  cancer: z.boolean(),
  country: z.string().min(1),
  symptoms: z.string().min(1),
  lifestyle: z.string().min(1),
  treatment: z.string().min(1),
  genetics: z.string().min(1),
  records: z.string().min(1),
})

const UserDetails = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()
  const [deletingUser, setDeletingUser] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name,
      Email: data?.Email,
      Phone: data?.Phone,
      cancer: data?.cancer || false,
      country: data?.country,
      lifestyle: data?.lifestyle,
      treatment: data?.treatment,
      genetics: data?.genetics,
      records: data?.records,
    },
  })
  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data])

  const handleSubmit = async (values) => {
    try {
      let newUserData
      if (!data?.id) {
        const bodyData = {
          email: values.Email,
          name: values.name,
          country: values.country,
        }

        
      }

      newUserData = await initUser()

      const response = await upsertUser({
        id: data?.id ? data.id : v4(),
        country: values.country,
        symptoms: values.symptoms,
        Phone: values.Phone,
        treatment: values.treatment,
        name: values.name,
        lifestyle: values.lifestyle,
        cancer: values.cancer,
        genetics: values.genetics,
        records:  values.records,
        createdAt: new Date(),
        updatedAt: new Date(),
        Email: values.Email,
        goal: 5,
      })
      toast({
        title: 'Created User',
      })
      if (data?.id) return router.refresh()
      if (response) {
        return router.refresh()
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'could not create your User',
      })
    }
  }
  const handleDeleteUser = async () => {
    if (!data?.id) return
    setDeletingUser(true)
    //WIP: discontinue the subscription
    try {
      const response = await deleteUser(data.id)
      toast({
        title: 'Deleted User',
        description: 'Deleted your User and all subaccounts',
      })
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'could not delete your User ',
      })
    }
    setDeletingUser(false)
  }

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Lets create an account personalized Just For you. You can edit settings
            later from the User settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your User name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>User Email</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="Phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Your Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                disabled={isLoading}
                control={form.control}
                name="cancer"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
                      <div>
                        <FormLabel>Cancer History</FormLabel>
                        <FormDescription>
                          Turning on will confirm either you have cancer or had cancer in the Past
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Country."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Agency"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="treatment"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Have you Under Gone Any Treatment Before</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="List Them Here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Symptoms</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Do you experience any symptoms?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="Rating"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Rating For The Previos Experince you had with doctors or Fighting Cancer So Far</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Write N/A if you don't have cancer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="lifestyle"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Lifestyle</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Do you Smoke, Drink etc ?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {data?.id && (
                <div className="flex flex-col gap-2">
                  <FormLabel>Create A Goal</FormLabel>
                  <FormDescription>
                    ✨ Create a goal for yourself. As you fight
                    cancer grow too so dont forget to set the bar higher!
                  </FormDescription>
                  <NumberInput
                    defaultValue={data?.goal}
                    onValueChange={async (val) => {
                      if (!data?.id) return
                      await updateUserDetails(data.id, { goal: val })
                      await saveActivityLogsNotification({
                        UserId: data.id,
                        description: `Updated the User goal to | ${val} Sub Account`,
                        subaccountId: undefined,
                      })
                      router.refresh()
                    }}
                    min={1}
                    className="bg-background !border !border-input"
                    placeholder="Sub Account Goal"
                  />
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : 'Save User Information'}
              </Button>
            </form>
          </Form>

          {data?.id && (
            <div className="flex flex-row items-center justify-between rounded-lg border border-destructive gap-4 p-4 mt-4">
              <div>
                <div>Danger Zone</div>
              </div>
              <div className="text-muted-foreground">
                Deleting your User cannpt be undone. This will also delete all
                sub accounts and all data related to your sub accounts. Sub
                accounts will no longer have access to funnels, contacts etc.
              </div>
              <AlertDialogTrigger
                disabled={isLoading || deletingUser}
                className="text-red-600 p-2 text-center mt-2 rounded-md hove:bg-red-600 hover:text-white whitespace-nowrap"
              >
                {deletingUser ? 'Deleting...' : 'Delete User'}
              </AlertDialogTrigger>
            </div>
          )}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-left">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                This action cannot be undone. This will permanently delete the
                User account and all related sub accounts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center">
              <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={deletingUser}
                className="bg-destructive hover:bg-destructive"
                onClick={handleDeleteUser}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </CardContent>
      </Card>
    </AlertDialog>
  )
}

export default UserDetails