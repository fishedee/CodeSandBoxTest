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

export default observer(() => {
  let argv = useMemo(() => {
    return observable({
      placeholder: 'do1',
      title: 'title1',
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
  //切换失败
  const toggleTitle = () => {
    if (argv.title == 'title1') {
      argv.title = 'title2';
    } else {
      argv.title = 'title1';
    }
  };
  console.log('render2');
  return (
    <div>
      <Button onClick={toggleSelect}>切换Select</Button>
      <Button onClick={toggleTitle}>切换Title</Button>
      <Form form={form} feedbackLayout="terse">
        <Field
          name="title"
          component={[Input, { placeholder: argv.placeholder }]}
          decorator={[FormItem, { title: '123' }]}
        />
        <FormConsumer>
          {() => <div>{JSON.stringify(form.values)}</div>}
        </FormConsumer>
      </Form>
    </div>
  );
});
