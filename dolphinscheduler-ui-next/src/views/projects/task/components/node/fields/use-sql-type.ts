/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IJsonItem } from '../types'

export function useSqlType(unusedModel: { [field: string]: any }): IJsonItem {
  const { t } = useI18n()

  const options = ref([] as { label: string; value: string }[])
  const loading = ref(false)

  const sqlTypes = [
    {
      id: '0',
      code: t('project.node.sql_type_query')
    },
    {
      id: '1',
      code: t('project.node.sql_type_non_query')
    }
  ]

  const getSqlTypes = async () => {
    if (loading.value) return
    loading.value = true
    try {
      options.value = sqlTypes.map((item) => ({
        label: item.code,
        value: item.id
      }))
      loading.value = false
    } catch (err) {
      loading.value = false
    }
  }

  onMounted(() => {
    getSqlTypes()
  })

  return {
    type: 'select',
    field: 'sqlType',
    span: 12,
    name: t('project.node.sql_type'),
    props: {
      loading: loading
    },
    options: options,
    validate: {
      trigger: ['input', 'blur'],
      required: true
    },
    value: '0'
  }
}
