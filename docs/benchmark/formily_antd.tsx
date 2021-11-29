import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import {
  SearchOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useState, useEffect, useMemo } from 'react';
import { ArrayTable, Input } from '@formily/antd';
import { createSchemaField, observer, FormConsumer } from '@formily/react';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd';
import { useCallback } from 'react';
type DataSourceType = {
  id: number;
  age: number;
  name: string;
  name2: string;
  name3: string;
  name4: string;
  name5: string;
};

const SchemaField = createSchemaField({
  components: {
    Space,
    Button,
    Table: ArrayTable,
    Input,
  },
});

const FormilyAntdTable: React.FC<any> = (props) => {
  const form = useMemo(() => {
    return createForm({
      values: {
        list: [] as DataSourceType[],
      },
    });
  }, []);
  useEffect(() => {
    let result: DataSourceType[] = [];
    for (let i = 0; i != 100; i++) {
      result.push({
        id: i,
        age: i + 100,
        name: 'name_' + i,
        name2: 'name2_' + i,
        name3: 'name3_' + i,
        name4: 'name4_' + i,
        name5: 'name5_' + i,
      });
    }
    form.values.list = result;
  }, []);
  const onAdd = () => {
    const newId = form.values.list.length;
    form.values.list.push({
      id: newId,
      age: newId + 100,
      name: 'name_' + newId,
      name2: 'name2_' + newId,
      name3: 'name3_' + newId,
      name4: 'name4_' + newId,
      name5: 'name5_' + newId,
    });
  };
  const listSchema = (
    <SchemaField>
      <SchemaField.Array
        name="list"
        x-component="Table"
        x-component-props={{
          pagination: {
            pageSize: 1000,
          },
        }}
      >
        <SchemaField.Void>
          <SchemaField.Void title="名字" x-component="Table.Column">
            <SchemaField.String name="name" x-component={'Input'} />
          </SchemaField.Void>
          <SchemaField.Void title="名字2" x-component="Table.Column">
            <SchemaField.String name="name2" x-component={'Input'} />
          </SchemaField.Void>
          <SchemaField.Void title="名字3" x-component="Table.Column">
            <SchemaField.String name="name3" x-component={'Input'} />
          </SchemaField.Void>
          <SchemaField.Void title="名字4" x-component="Table.Column">
            <SchemaField.String name="name4" x-component={'Input'} />
          </SchemaField.Void>
          <SchemaField.Void title="名字5" x-component="Table.Column">
            <SchemaField.String name="name5" x-component={'Input'} />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField.Array>
    </SchemaField>
  );

  return (
    <Form form={form}>
      <div>
        <button onClick={onAdd}>{'添加一行'}</button>
        {listSchema}
      </div>
    </Form>
  );
};

const Wrapper: React.FC<any> = (props) => {
  const [isShow, setIsShow] = useState(0);
  const onClick = () => {
    setIsShow(isShow + 1);
  };
  //全局layout
  return (
    <div>
      <div>
        <button onClick={onClick}>{'点我刷新'}</button>
      </div>
      {isShow ? <FormilyAntdTable key={isShow} /> : null}
    </div>
  );
};

export default Wrapper;
