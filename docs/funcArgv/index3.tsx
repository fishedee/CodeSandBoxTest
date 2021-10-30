import {
  createForm,
  onFieldChange,
  onFieldInputValueChange,
} from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';
import React, { useMemo } from 'react';
import { Button } from 'antd';
import { observer } from '@formily/reactive-react';
import { observable } from '@formily/reactive';
import { Field } from '@formily/react';
import 'antd/dist/antd.compact.css';
import { useState } from 'react';

const MyInput = (props: any) => {
  const { placeholderRef, ...resetProps } = props;
  return <Input {...resetProps} placeholder={placeholderRef.placeholder} />;
};

export default () => {
  let argv = useMemo(() => {
    return observable({
      placeholder: 'do1',
    });
  }, []);
  const form = useMemo(() => {
    return createForm({
      values: {},
      effects: () => {},
    });
  }, []);
  const toggleSelect = () => {
    if (argv.placeholder.length == 3) {
      argv.placeholder = 'do23';
    } else {
      argv.placeholder = 'do1';
    }
  };
  console.log('render3');
  return (
    <div>
      <Button onClick={toggleSelect}>切换Select</Button>
      <Form form={form} feedbackLayout="terse">
        <Field name="title" component={[MyInput, { placeholderRef: argv }]} />
        <FormConsumer>
          {() => <div>{JSON.stringify(form.values)}</div>}
        </FormConsumer>
      </Form>
    </div>
  );
};
