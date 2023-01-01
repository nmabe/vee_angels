/* eslint-disable react/prop-types */
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { Fragment } from 'react'
import CurrencyInput from 'react-currency-input-field'

function CommonForm({
  formControl,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  buttonClassName = '',
  labelClassName = 'mb-1 text-white'
}) {
  const getFormComponentByType = (controlItem) => {
    let component = null

    switch (controlItem.contentType) {
      case 'input':
        component = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            key={controlItem.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value
              })
            }
          />
        )
        break
      case 'select':
        component = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((selectThing) => (
                    <SelectItem
                      key={selectThing.id}
                      className="hover:bg-slate-200"
                      value={selectThing.label}
                    >
                      {selectThing.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        )
        break
      case 'textarea':
        component = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            key={controlItem.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value
              })
            }
          />
        )
        break
      case 'date':
        component = (
          <Fragment key={controlItem.name}>
            <input
              className="border-gray-200 border rounded-md border-solid p-2"
              aria-label="Date"
              type={controlItem.contentType}
              placeholder={
                formData[controlItem.name]
                  ? formData[controlItem.name]
                  : controlItem.placeholder
              }
              key={controlItem.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [controlItem.name]: e.target.value
                })
              }
            />
          </Fragment>
        )
        break
      case 'formGroup':
        component = (
          <Card>
            <CardHeader className="p-1">
              <CardDescription className="text-xs ">
                {controlItem.placeholder}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid w-full gap-2 child:p-0">
              {controlItem.options.map((groupItem) => {
                switch (groupItem.contentType) {
                  case 'input':
                    return (
                      <Input
                        name={groupItem.name}
                        placeholder={groupItem.placeholder}
                        id={groupItem.name}
                        type={groupItem.type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [groupItem.name]: e.target.value
                          })
                        }
                      />
                    )
                  case 'select':
                    return (
                      <Select
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            [groupItem.name]: value
                          })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={groupItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                          {groupItem.options && groupItem.options.length > 0
                            ? groupItem.options.map((selectThing) => (
                                <SelectItem
                                  key={selectThing.id}
                                  className="hover:bg-slate-200"
                                  value={selectThing.label}
                                >
                                  {selectThing.label}
                                </SelectItem>
                              ))
                            : null}
                        </SelectContent>
                      </Select>
                    )
                  default:
                    return (
                      <Input
                        name={groupItem.name}
                        placeholder={groupItem.placeholder}
                        id={groupItem.name}
                        type={groupItem.type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [groupItem.name]: e.target.value
                          })
                        }
                      />
                    )
                }
              })}
            </CardContent>
          </Card>
        )
        break
      case 'cash':
        component = (
          <CurrencyInput
            className="border-gray-200 border rounded-md border-solid p-2"
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            defaultValue={'000'}
            decimalsLimit={2}
            prefix="R "
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value
              })
            }
          />
        )
        break
      default:
        component = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value
              })
            }
          />
        )
        break
    }

    return component
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 box">
        {formControl.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className={labelClassName}>{controlItem.label}</Label>
            {getFormComponentByType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className={`mt-3 w-full text-sm py-2.5 ${buttonClassName}`}
      >
        {buttonText || 'Submit'}
      </Button>
    </form>
  )
}

export default CommonForm
