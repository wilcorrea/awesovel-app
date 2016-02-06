<?php

namespace {{namespace}}\App\{{module}}\Model;

use Awesovel\Defaults\Model;

class {{entity}} extends Model {

  public function __construct(array $attributes = array()) {
    parent::__construct('{{module}}', '{{entity}}', $attributes);
  }

}
