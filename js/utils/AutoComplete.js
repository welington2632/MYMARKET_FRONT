class AutoComplete {
    static AutoCompletar (campo, valores) {
          $(campo).autocomplete({
            delay: 0,
            source: valores
          });
    }
}