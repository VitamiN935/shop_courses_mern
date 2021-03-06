import React from 'react'
import FormCreate from "../../components/forms/FormCreate/FormCreate";
import useTitle from "../../hooks/useTitle";

const CreateCourse = () => {
  useTitle('Создание курса')
  return (
    <section className={'page mt-4'}>
      <h1>Создать курс</h1>
      <FormCreate />
    </section>
  )
}

export default CreateCourse