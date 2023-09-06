import { assign, createMachine } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: {
          target: 'success',
          actions: assign({
            countries: (context,event)=> event.data 
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Falló el request'
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: 'loading'}
      }
    }
  }
}

const flyMachine = createMachine({
  id: "comprar tickets de vuelo",
  initial: "inicial",
  context: {
    passengers: [],
    selectedCountry: '',
    countries: [],
    error: '',
  },
  states: {
    inicial: {
      on: {
        START: {
          target: "search",
        },
      },
    },
    search: {
      on: {
        CONTINUE: {
          target: "passengers",
          actions: assign({
            selectedCountry: (context, event) => event.selectedCountry 
          })
        },
        CANCEL: {
          target:'inicial',
          actions: 'cleanContext'
        }
      },
      ...fillCountries,
    },
    passengers: {
      on: {
        DONE: {
          target: 'tickets',
          cond: 'moreThanOnePassenger'
        },
        CANCEL: {
          target: "inicial",
          actions: 'cleanContext'
        },
        BACK: {
          target: "search",
          actions: 'cleanContext'
        },
        ADD: {
          target: 'passengers',
          actions: assign(
            (context, event) => context.passengers.push(event.newPassenger)
          )
        }
      },
    },
    tickets: {
      after: {
        5000: {
          target: 'inicial',
          actions: 'cleanContext'
        }
      },
      on: {
        FINISH: {
          target: "inicial",
          actions: assign({
            selectedCountry: '',
            passengers: []
          })
        }, 
      }
    },
  },
},
{
  actions: {
    cleanContext: assign({
      passengers: [],
      selectedCountry: '',
      countries: [],
      error: '',
    })
  },
  guards: {
    moreThanOnePassenger: (context) => {
      return context.passengers.length > 0
    }
  }
}
);

export { flyMachine }