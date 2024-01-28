import React, {useMemo, useState} from 'react';
import COLORS from '../theme/colors';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../components/Button';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../store/store';
import {KeyboardAvoidingView} from 'react-native';
import {Platform} from 'react-native';
import {startLoginWithEmailPassword,startCreatingUserWithEmailPassword} from '../store/auth';
import {useForm} from 'react-hook-form';
import {CustomInput} from '../components/CustomInput';

export const LoginScreen = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useAppDispatch();
  const {status, errorMessage} = useSelector((state: RootState) => state.auth);
  const isAuhenticating = useMemo(() => status === 'checking', [status]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    if(errors.email || errors.password || errors.phoneNumber) return;
    dispatch(
      startLoginWithEmailPassword({
        email: data.email,
        password: data.password,
      }),
    );
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
              Bienvenido
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
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <CustomInput
                placeholder="Enter your email"
                control={control}
                name="email"
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
              Password
            </Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <CustomInput
                placeholder="Enter your password"
                control={control}
                name="password"
                secureTextEntry={!passwordShow}
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
            title="Inicia sesión"
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
              O iniciar sesión con
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
              onPress={() => console.log('Sign Up')}
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
              No tienes una cuenta?
            </Text>
            <Pressable onPress={() => console.log('Sign Up')}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  marginLeft: 6,
                }}>
                Registrate
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
