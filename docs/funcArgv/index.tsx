import {
  createForm,
  Field,
  onFieldChange,
  onFieldInputValueChange,
} from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';
import React, { useMemo } from 'react';
import { Button } from 'antd';
import { observer } from '@formily/reactive-react';
import { observable, observe } from '@formily/reactive';
import 'antd/dist/antd.compact.css';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
});

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
      effects: () => {
        onFieldInputValueChange('title', (field) => {
          const field2 = field as Field;
          console.log('title change to ', field2.value);
        });
      },
    });
  }, []);
  //切换失败
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
  console.log('render1');
  return (
    <div>
      <Button onClick={toggleSelect}>切换Select</Button>
      <Button onClick={toggleTitle}>切换Title</Button>
      <Form form={form} feedbackLayout="terse">
        <SchemaField>
          <SchemaField.String
            title={argv.title}
            x-decorator={'FormItem'}
            x-component={'Input'}
            x-component-props={{
              placeholder: argv.placeholder,
            }}
          />
        </SchemaField>
        <FormConsumer>
          {() => <div>{JSON.stringify(form.values)}</div>}
        </FormConsumer>
      </Form>
    </div>
  );
});
