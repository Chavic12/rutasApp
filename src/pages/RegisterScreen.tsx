import React, {useMemo, useState} from 'react';
import COLORS from '../theme/colors';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../components/Button';
import {useAppDispatch} from '../store/store';
import {useForm} from 'react-hook-form';
import {CustomInput} from '../components/CustomInput';
import {
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
} from '../store/auth';

export const RegisterScreen = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},

    getValues,
  } = useForm();
  console.log(getValues);
  const formData = getValues();
  const onSubmit = async (data: any) => {
    console.log(data);
    dispatch(
      startCreatingUserWithEmailPassword({
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      }),
    );
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
    console.log('Google Sign In');
  };

  console.log(errors);
  return (
    // <LinearGradient
    //     style={{flex: 1}}
    //     colors={[COLORS.primary, COLORS.secondary]}
    // >
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 22,
        }}>
        <View
          style={{
            marginVertical: 22,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}>
            Create Account
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}>
            Connect with your friends and family
          </Text>
        </View>
        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              marginVertical: 8,
            }}>
            Email address
          </Text>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomInput
              placeholder="Enter your email"
              control={control}
              name="email"
              // Reglas para el email
              rules={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email is invalid',
                },
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              marginVertical: 8,
            }}>
            Mobile Number
          </Text>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomInput
              placeholder="Enter your mobile number"
              control={control}
              name="phoneNumber"
              // Pon relgas para el numero de telefono
              rules={{
                required: {
                  value: true,
                  message: 'Mobile number is required',
                },
                minLength: {
                  value: 10,
                  message: 'Mobile number is invalid',
                },
                maxLength: {
                  value: 10,
                  message: 'Mobile number is invalid',
                },
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              marginVertical: 8,
            }}>
            Password
          </Text>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomInput
              placeholder="Enter your password"
              control={control}
              name="password"
              secureTextEntry={!passwordShow}
              // Pon reglas para la contraseña
              rules={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 6,
                  message: 'Password is invalid',
                },
              }}
            />
            <TouchableOpacity
              onPress={() => setPasswordShow(!passwordShow)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              {passwordShow ? (
                <Icon name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Icon name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Sign Up"
          filled
          onPress={handleSubmit(onSubmit)}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />

          <Text
            style={{
              fontSize: 14,
            }}>
            Or Sign Up with
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={onGoogleSignIn}
            style={{
              flex: 1,
              flexDirection: 'row',
              height: 48,
              borderWidth: 1,
              marginRight: 4,
              borderRadius: 10,
              backgroundColor: COLORS.black,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="logo-google" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}>
            Already have an account?
          </Text>
          <Pressable onPress={onSubmit}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
                marginLeft: 6,
              }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>

    // </LinearGradient>
  );
};
