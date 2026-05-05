'use client'

import { Button, Flex, Grid } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
import { MyFieldset, MyFileInput, MyNumberInput, MyTextInput } from 'aq-fe-framework/components';
import { useState } from 'react';


export interface I_tx4191gsrz_Read {
    modulecode?: string; //Mã module
    modulename?: string; //Tên module
    ownername?: string;  // Tên đơn vị chủ quản 
    email?: string;  // Email
    phone?: string | null; // Số điện thoại
    registerdate?: Date | null; // ngày đăng kí 
    expiredate?: Date | null; // Ngày hết hạn
    favicon?: File | null;
    logo?: File | null;
}


export default function F_b5kgyy98l9_Create() {
    const form = useForm<I_tx4191gsrz_Read>({
        initialValues: {
            modulecode: '',
            modulename: '',
            ownername: '',
            email: '',
            phone: null,
            registerdate: null,
            expiredate: null,
            favicon: null,
            logo: null,
        },
        validate: {
            modulecode: (value) => ((value ?? '').length < 1 ? 'Mã module không được để trống' : null),
            modulename: (value) => ((value ?? '').length < 1 ? 'Tên module không được để trống' : null),
        }
    });
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    return (
        <MyFieldset title='Cập nhật thông tin đơn vị chủ quản'>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!form.validate().hasErrors) {
                    showNotification({
                        title: 'Thành công',
                        message: 'Dữ liệu đã được lưu',
                        color: 'green'
                    });
                } else {
                    showNotification({
                        title: 'Lỗi',
                        message: '',
                        color: 'red'
                    });
                }
            }}>
                <Grid gutter={{ xs: 'lg' }}>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <MyTextInput label='Mã module' {...form.getInputProps("modulecode")} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <MyTextInput label='Tên module' {...form.getInputProps("modulename")} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 12 }}>
                        <MyTextInput label='Tên đơn vị chủ quản' {...form.getInputProps("ownername")} />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <MyTextInput label='Email' {...form.getInputProps("email")} />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <MyNumberInput min={0} label='Số điện thoại' {...form.getInputProps("phone")} hideControls />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <DateInput
                            label='Ngày đăng kí'
                            value={form.values.registerdate}
                            onChange={(date) => form.setFieldValue('registerdate', new Date(date || ""))}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <DateInput
                            label='Ngày hết hạn'
                            value={form.values.expiredate}
                            onChange={(date) => form.setFieldValue('expiredate', new Date(date || ""))}
                        />

                    </Grid.Col>


                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <MyFileInput
                            label="Favicon (16px x 16px)"
                            onChange={(file) => {
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    setFaviconPreview(url);
                                    form.setFieldValue("favicon", file);
                                }
                            }}
                        />
                        {faviconPreview && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={faviconPreview} alt="Favicon preview" style={{ marginTop: 8, maxWidth: "100%", height: "auto" }} />
                        )}

                    </Grid.Col>

                    {/* <Grid.Col span={{ base: 12, md: 6 }}>
                        <MyFileInput label="Logo (330px x 115px)" {...form.getInputProps("logo")} />
                    </Grid.Col> */}
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <MyFileInput
                            label="Logo (330px x 115px)"
                            onChange={(file) => {
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    setLogoPreview(url);
                                    form.setFieldValue("logo", file);
                                }
                            }}
                        />
                        {logoPreview && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logoPreview} alt="Logo preview" style={{ marginTop: 8, maxWidth: "100%", height: "auto" }} />
                        )}

                    </Grid.Col>


                </Grid>

                <Flex mt="24" justify="flex-end" direction="row">
                    <Button type="submit" color="green" size="xs">
                        Lưu
                    </Button>
                </Flex>
            </form>
        </MyFieldset>
    )
}