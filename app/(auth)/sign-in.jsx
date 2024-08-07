import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn = () => {

  const [form, setform] = useState({
    email:'',
    password:''
  })
  const [isSubmitting, setisSubmitting] = useState(false)
  const submit = () => {

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6"> 
        <Image
        source={images.logo}
        resizeMode='contain'
        className="w-[115px]"
        />
       <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
        </Text>
        <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({...form, email: e })}
        otherStyles="mt-7"
        KeyboardType="email-address"
        />
        <FormField
        title="Password"
        value={form.password}
        handleChangeText={(e) => setForm({...form, password: e })}
        otherStyles="mt-7"
        />

        <CustomButton 
        title="Sign In"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={isSubmitting}
        />
        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Don't have an account?
          </Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn