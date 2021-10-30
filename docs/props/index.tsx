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
import { observable } from '@formily/reactive';
import 'antd/dist/antd.compact.css';
import { useState } from 'react';

const MyInput = (props: any) => {
  console.log(props);
  return <Input {...props} />;
};
const SchemaField = createSchemaField({
  components: {
    FormItem,
    MyInput,
    Select,
  },
});

type SelectType = {
  label: string;
  value: number;
};
export default () => {
  let [select, setSelect] = useState<String>('do1');
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
    if (select.length == 3) {
      setSelect('do23');
    } else {
      setSelect('do1');
    }
  };
  console.log('current placeholder ', select);
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
              placeholder: select,
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
