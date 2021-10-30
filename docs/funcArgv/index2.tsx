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
import { observable } from '@formily/reactive';
import 'antd/dist/antd.compact.css';
import { useState } from 'react';

const MyInput = observer((props: any) => {
  const { placeholderRef, ...resetProps } = props;
  return <Input {...resetProps} placeholder={placeholderRef.placeholder} />;
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    MyInput,
    Select,
  },
});

export default () => {
  let argv = useMemo(() => {
    return observable({
      placeholder: 'do1',
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
  const toggleSelect = () => {
    if (argv.placeholder.length == 3) {
      argv.placeholder = 'do23';
    } else {
      argv.placeholder = 'do1';
    }
  };
  console.log('render2');
  return (
    <div>
      <Button onClick={toggleSelect}>切换Select</Button>
      <Form form={form} feedbackLayout="terse">
        <SchemaField>
          <SchemaField.String
            name="title"
            x-decorator={'FormItem'}
            x-component={'MyInput'}
            x-component-props={{
              placeholderRef: argv,
            }}
          />
        </SchemaField>
        <FormConsumer>
          {() => <div>{JSON.stringify(form.values)}</div>}
        </FormConsumer>
      </Form>
    </div>
  );
};
