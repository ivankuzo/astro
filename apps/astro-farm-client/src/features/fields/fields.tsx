import { Field } from './field'

export const Fields = () => {
    return (
        <div className='relative aspect-[100/70] w-full'>
            <Field col={1} row={0} fieldNumber={1} />
            <Field col={2} row={0} fieldNumber={2} />

            <Field col={0} row={1} fieldNumber={3} />
            <Field col={1} row={1} fieldNumber={4} />
            <Field col={2} row={1} fieldNumber={5} />
            <Field col={3} row={1} fieldNumber={6} />

            <Field col={0} row={2} fieldNumber={7} />
            <Field col={1} row={2} fieldNumber={8} />
            <Field col={2} row={2} fieldNumber={9} />
            <Field col={3} row={2} fieldNumber={10} />

            <Field col={1} row={3} fieldNumber={11} />
            <Field col={2} row={3} fieldNumber={12} />
        </div>
    )
}
